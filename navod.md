# Vzorkovník - Návod na pojmenování

## Jak to funguje

Systém automaticky vytváří URL adresy podle názvu článku. Proto je důležité dodržovat přesnou konvenci pojmenování.

---

## Formát názvu článku

```
VZK-[TYP]-[CS]-[KOD]
```

| Část | Význam                  | Příklad                  |
| ---- | ----------------------- | ------------------------ |
| VZK  | Prefix (vždy stejný)    | VZK                      |
| TYP  | Typ nábytku             | SEDACKY, POSTELE, KRESLA |
| CS   | Cenová skupina          | CS1, CS2, CS3...         |
| KOD  | Kód kategorie čalounění | LEMANS, PROXIMA, SOREL   |

---

## Příklady

| Typ nábytku | Cenová skupina | Čalounění | Název článku              |
| ----------- | -------------- | --------- | ------------------------- |
| Sedačky     | 2              | Le Mans   | `VZK-SEDACKY-CS2-LEMANS`  |
| Sedačky     | 2              | Proxima   | `VZK-SEDACKY-CS2-PROXIMA` |
| Sedačky     | 3              | Sorel     | `VZK-SEDACKY-CS3-SOREL`   |
| Postele     | 1              | Le Mans   | `VZK-POSTELE-CS1-LEMANS`  |
| Křesla      | 2              | Proxima   | `VZK-KRESLA-CS2-PROXIMA`  |

---

## Nastavení v produktu

V parametrech produktu zadejte hodnotu **včetně prefixu VZK**. Hodnota **musí být shodná** s názvem článku:

```
VZK-SEDACKY-CS2-LEMANS
```

Bez přesné shody s názvem článku systém vzorkovník nenajde.

---

## Postup při vytváření nového článku

1. **Vytvořte nový článek** v příslušné kategorii blogu
2. **Název článku** = přesně podle formátu výše (např. `VZK-SEDACKY-PP2-LEMANS`)
3. **URL adresu NEUPRAVUJTE** - Shoptet ji vytvoří automaticky z názvu
4. **Obsah článku** = obrázky a názvy jednotlivých vzorků čalounění

---

## Kategorizace vzorkovníků

Systém **automaticky seskupuje** vzorky podle **třetí části** kódu (cenová skupina – CS).

### Jak to funguje

-   Z každého kódu v parametrech produktu se bere **3. pozice** (oddělená pomlčkami).
-   Příklady: `VZK-SEDACKY-CS2-LEMANS` → **CS2**, `VZK-SEDACKY-CS2-PROXIMA` → **CS2**, `VZK-SEDACKY-CS3-SOREL` → **CS3**.
-   Všechny vzorkovníky se stejným kódem CS (např. oba CS2) tvoří **jednu kategorii**.
-   **Nad první** vzorkou v každé kategorii se zobrazí nadpis podle mapování (např. CS2 → „CS II.“, CS3 → „CS III.“).

### Příklad

Máte v produktu dva parametry: `VZK-SEDACKY-CS2-LEMANS` a `VZK-SEDACKY-CS2-PROXIMA`. Oba mají 3. pozici **CS2**. Na záložce Vzorkovník tedy:

1. Nad první galerií (Le Mans) se zobrazí nadpis **CS II.**
2. Následují vzorky z obou článků (Le Mans, pak Proxima) bez opakování nadpisu – kategorie CS2 je jedna.

Pokud přidáte ještě `VZK-SEDACKY-CS3-SOREL`, nad jeho první galerií se zobrazí **CS III.**

### Mapování názvů kategorií (CS → nadpis)

Nadpisy pro jednotlivé CS kódy (CS II., CS III., …) jsou definované v kódu a lze je upravit v administraci Shoptetu:

**Vzhled a obsah → Editor → HTML kód → Zápatí (Zapati)**

Tam lze doplnit nebo změnit mapování, které systém použije pro zobrazení nadpisů nad kategoriemi vzorkovníků.

---

## Pravidla

✅ **Používejte**

-   Velká písmena
-   Pomlčky mezi částmi
-   Bez diakritiky (SEDACKY ne SEDAČKY)
-   Bez mezer

❌ **Nepoužívejte**

-   Mezery
-   Diakritiku (háčky, čárky)
-   Podtržítka
-   Speciální znaky

---

## Co když přidám nový typ čalounění?

1. Vyberte si krátký kód (např. pro "Milano" → `MILANO`)
2. Zapište ho do někam do tabulky
3. Používejte ho konzistentně napříč všemi cenovými hladinami

---

## Kontrola

Po vytvoření článku zkontrolujte, že URL vypadá takto:

```
/vzk-sedaciesupravy-cs2-boston/
```

Pokud ano, vše je v pořádku.
