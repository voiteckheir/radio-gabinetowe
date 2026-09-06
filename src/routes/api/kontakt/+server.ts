import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// POZIOM 3: Prosta "pamięć" serwera do limitowania zapytań z jednego IP
const rateLimit = new Map<string, { count: number, resetTime: number }>();

export async function POST({ request, getClientAddress }) {
    try {
        // --- TARCZA ANTYSPAMOWA (RATE LIMITING) ---
        // Pobieramy IP użytkownika (SvelteKit potrafi to zrobić automatycznie)
        const ip = getClientAddress();
        const now = Date.now();
        const limitData = rateLimit.get(ip);

        if (limitData && now < limitData.resetTime) {
            if (limitData.count >= 3) {
                // Jeśli ktoś wysłał już 3 maile, blokujemy go na godzinę
                return json({ success: false, message: 'Wysłano zbyt wiele wiadomości. Spróbuj ponownie za godzinę.' }, { status: 429 });
            }
            limitData.count++;
        } else {
            // Resetujemy licznik po 1 godzinie (3 600 000 milisekund)
            rateLimit.set(ip, { count: 1, resetTime: now + 3600000 });
        }

        // Pobieramy dane przesłane z przeglądarki
        const data = await request.json();
        const { email, message, subject, imie, honeypot } = data;

        // --- TARCZA ANTYSPAMOWA (HONEYPOT) ---
        if (honeypot) {
            // Bot wypełnił ukryte pole!
            // Zwracamy mu "sukces", żeby myślał, że wygrał, ale NIE wysyłamy maila.
            console.log(`[SPAM BLOCKED] Zablokowano bota z IP: ${ip}`);
            return json({ success: true, message: 'Wiadomość wysłana!' }); 
        }

        // Sklejamy temat (zależnie czy z głównej, czy z podstrony Kontakt)
        const tematWiadomosci = subject ? `[Kontakt Strona] ${subject}` : `[Strona Główna] Wiadomość od: ${imie}`;
        
        // --- WYSYŁKA PRZEZ OVH ---
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            secure: true,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Radio Gabinetowe (Strona)" <${env.EMAIL_USER}>`, 
            to: env.EMAIL_USER, // Odbiorca: Redakcja
            replyTo: email,     // Żebyś mógł od razu kliknąć "Odpowiedz" w swoim programie pocztowym
            subject: tematWiadomosci,
            text: `Wiadomość od: ${email}\n\nTreść:\n${message}`,
            html: `
                <h3>Nowa wiadomość ze strony!</h3>
                <p><strong>Nadawca:</strong> ${email} ${imie ? `(${imie})` : ''}</p>
                <p><strong>Treść:</strong></p>
                <p style="padding: 12px; border-left: 4px solid #d31a38; background: #f9f9f9; color: #000;">
                    ${message.replace(/\n/g, '<br>')}
                </p>
            `
        };

        await transporter.sendMail(mailOptions);

        return json({ success: true, message: 'Wiadomość wysłana!' });

    } catch (error) {
        console.error('Błąd wysyłania e-maila:', error);
        return json({ success: false, message: 'Błąd serwera podczas łączenia z pocztą.' }, { status: 500 });
    }
}