# Hunter x Hunterdle

Gra przeglądarkowa inspirowana Wordle i Loldle, w której użytkownik zgaduje postać z uniwersum **Hunter x Hunter**, otrzymując wskazówki dotyczące cech postaci takich jak `gender`, `nenType`, `affiliation` i `firstArc`.

## 🚀 Funkcje

- Zgadywanie jednej losowej postaci na grę.
- Podpowiedzi na podstawie cech postaci.
- Dane pobierane z lokalnego pliku JSON.
- Interfejs minimalistyczny i responsywny (mobile-first).
- Walidacja zgadywania i blokada duplikatów.
- Lekka i szybka implementacja bez backendu i zależności.

## 🛠️ Instalacja i uruchomienie

## 1. Sklonuj repozytorium

git clone https://github.com/Japanello420/HunterXHunterdle.git

## 2. Otwórz projekt w Visual Studio Code

## 3. Zainstaluj rozszerzenie Live Server

Jeśli jeszcze go nie masz, zainstaluj rozszerzenie „Live Server” z marketplace'u VS Code.

## 4. Uruchom aplikację

Kliknij prawym przyciskiem na index.html → wybierz "Open with Live Server".
Aplikacja uruchomi się w przeglądarce (domyślnie pod adresem http://127.0.0.1:5500 lub podobnym).

## 🧩 Struktura projektu

📁 data/
┗ 📜 characters.json # lokalna baza postaci HxH
📁 src/
┣ 📂 game/ # logika zgadywania
┣ 📂 ui/ # manipulacja DOM, input, feedback
┣ 📂 styles/ # pliki SCSS (zmienne, layout, komponenty)
┣ 📜 main.js # punkt wejściowy aplikacji
┗ 📜 index.html

## 📘 Jak grać

1.  Wpisz imię postaci w polu zgadywania.

2.  Po zatwierdzeniu zobaczysz podpowiedzi:

🟩 Zielony – cecha zgadza się idealnie.

🟨 Żółty – cecha częściowo się zgadza.

⬜ Szary – cecha nie pasuje.

    - Masz ograniczoną liczbę prób (np. 6).
    - Nie możesz zgadnąć tej samej postaci więcej niż raz.
    - Kliknij „Nowa gra”, aby zresetować stan i wylosować inną postać.

## 📄 Licencja

MIT License. Projekt stworzony do celów edukacyjnych.

## ✨ Autor

Projekt stworzony przez Cezary Krenke s31319
