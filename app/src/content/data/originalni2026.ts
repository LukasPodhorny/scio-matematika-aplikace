import type { Task } from "../types";

/** Vlastní typové úlohy; žádná zadání nejsou převzata z testů Scio. */
export const ORIGINALNI_2026: Task[] = [
  {
    "id": "zaklady-original-2026-01",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-procenta",
    "podtemaNazev": "Procenta a trojčlenka",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Cena předplatného vzrostla o 20 \\%. O kolik procent musí nyní klesnout, aby byla o 10 \\% nižší než původně?}",
    "moznosti": [
      "25\\%",
      "20\\%",
      "30\\%",
      "15\\%"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Nová cílová cena je 0,9 původní ceny. Poměr k nynější ceně je 0,9/1,2 = 0,75, tedy sleva 25 \\%.}"
    ],
    "typickaChyba": "Procenta změny počítáme z aktuální ceny.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-02",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-procenta",
    "podtemaNazev": "Procenta a trojčlenka",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Směs obsahuje 6 kg ořechů a 9 kg vloček. Kolik kg vloček přidáme, aby ořechy tvořily 30 \\% hmotnosti?}",
    "moznosti": [
      "\\text{6}",
      "\\text{5}",
      "\\text{3}",
      "\\text{4}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Celková hmotnost musí být 6/0,3 = 20 kg. Nyní je 15 kg, přidáme 5 kg.}"
    ],
    "typickaChyba": "Mění se celková hmotnost, hmotnost ořechů zůstává.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-03",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-delitelnost",
    "podtemaNazev": "Dělitelnost, NSD a NSN",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Dvě světla blikají po 18 a 24 sekundách. Nyní blikla současně. Kolikrát ještě bliknou současně během následujících 5 minut včetně konce?}",
    "moznosti": [
      "\\text{5}",
      "\\text{12}",
      "\\text{4}",
      "\\text{3}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Společný interval je NSN(18,24) = 72 sekund. Do 300 sekund patří časy 72, 144, 216 a 288.}"
    ],
    "typickaChyba": "Počáteční bliknutí se znovu nepočítá.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-04",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-delitelnost",
    "podtemaNazev": "Dělitelnost, NSD a NSN",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik celých čísel od 1 do 120 včetně je dělitelných 4 nebo 6, ale ne oběma současně?}",
    "moznosti": [
      "\\text{40}",
      "\\text{50}",
      "\\text{20}",
      "\\text{30}"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Násobků 4 je 30, násobků 6 je 20, společných je 10. Výsledek je 30 + 20 − 2 ⋅ 10 = 30.}"
    ],
    "typickaChyba": "Společné násobky je třeba odečíst dvakrát.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-05",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-mnoziny",
    "podtemaNazev": "Množiny a intervaly",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Z 48 účastníků umí 29 plavat a 25 bruslit. Sedm neumí ani jedno. Kolik umí právě jednu z těchto dovedností?}",
    "moznosti": [
      "\\text{28}",
      "\\text{13}",
      "\\text{35}",
      "\\text{41}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Alespoň jednu umí 41 lidí. Obě umí 29 + 25 − 41 = 13. Právě jednu umí 41 − 13 = 28.}"
    ],
    "typickaChyba": "Součet počtů zahrnuje průnik dvakrát.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-06",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-logika",
    "podtemaNazev": "Výroková logika",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Platí: Každý, kdo odevzdal projekt, dostal potvrzení. Iva potvrzení nedostala. Co nutně platí?}",
    "moznosti": [
      "\\text{Iva projekt odevzdala.}",
      "\\text{Iva projekt neodevzdala.}",
      "\\text{Nikdo projekt neodevzdal.}",
      "\\text{Každý s potvrzením odevzdal projekt.}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Kdyby Iva projekt odevzdala, musela by potvrzení dostat. To odporuje zadání, proto projekt neodevzdala.}"
    ],
    "typickaChyba": "Implikaci lze obměnit, nikoli libovolně obrátit.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-07",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-procenta",
    "podtemaNazev": "Procenta a trojčlenka",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Stroj vyrobí 90 součástek za 6 minut. Po úpravě vyrobí o 20 \\% více za minutu. Za kolik minut vyrobí 126 součástek?}",
    "moznosti": [
      "\\text{6}",
      "\\text{9}",
      "\\text{7}",
      "\\text{8{,}4}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Původní výkon je 15 kusů za minutu, nový 18. Čas je 126/18 = 7 minut.}"
    ],
    "typickaChyba": "Zvýšení výkonu o 20 % neznamená zkrácení času o 20 %.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-08",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-obory",
    "podtemaNazev": "Číselné obory",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik celých čísel leží ostře mezi odmocninou ze 30 a odmocninou ze 110?}",
    "moznosti": [
      "\\text{4}",
      "\\text{6}",
      "\\text{7}",
      "\\text{5}"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Platí 5 < odmocnina ze 30 < 6 a 10 < odmocnina ze 110 < 11. Vyhovují 6, 7, 8, 9, 10.}"
    ],
    "typickaChyba": "Počítáme i obě krajní celá čísla, protože neleží na hranici intervalu.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-09",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-procenta",
    "podtemaNazev": "Procenta a trojčlenka",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Mapa má měřítko 1 : 25 000. Obdélníkový pozemek na ní měří 2 cm krát 3 cm. Jakou má skutečnou rozlohu v hektarech?}",
    "moznosti": [
      "\\text{37{,}5}",
      "\\text{3{,}75}",
      "\\text{150}",
      "\\text{375}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Strany jsou 500 a 750 m. Obsah 375 000 metrů čtverečních vydělíme 10 000: 37,5 ha.}"
    ],
    "typickaChyba": "Měřítko délky se při výpočtu obsahu uplatní dvakrát.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "zaklady-original-2026-10",
    "okruh": "zaklady",
    "tema": "zaklady",
    "podtema": "zakl-mocniny",
    "podtemaNazev": "Mocniny, odmocniny a zlomky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kladné číslo má třetí mocninu rovnou 64. Jaká je druhá mocnina jeho převrácené hodnoty?}",
    "moznosti": [
      "\\text{16}",
      "\\frac1{16}",
      "\\frac18",
      "\\frac1{64}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Číslo je 4. Jeho převrácená hodnota je 1/4 a její druhá mocnina je 1/16.}"
    ],
    "typickaChyba": "Nezaměňujte převrácenou hodnotu s opačným číslem.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-01",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-upravy",
    "podtemaNazev": "Úpravy výrazů",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro } a+b=9,\\ ab=14\\text{ určete }a^2+b^2.",
    "moznosti": [
      "\\text{53}",
      "\\text{67}",
      "\\text{81}",
      "\\text{109}"
    ],
    "spravna": 0,
    "postup": [
      "a^2+b^2=(a+b)^2-2ab=81-28=53."
    ],
    "typickaChyba": "Ve druhé mocnině součtu je také smíšený člen.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-02",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-mnohocleny",
    "podtemaNazev": "Mnohočleny a vzorce",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro }x-y=5,\\ x^2-y^2=65\\text{ určete }xy.",
    "moznosti": [
      "\\text{60}",
      "\\text{36}",
      "\\text{30}",
      "\\text{42}"
    ],
    "spravna": 1,
    "postup": [
      "x+y=65/5=13,\\quad x=9,\\ y=4,\\quad xy=36."
    ],
    "typickaChyba": "Rozdíl čtverců není čtvercem rozdílu.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-03",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-lomene",
    "podtemaNazev": "Lomené výrazy",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro která reálná }x\\text{ není výraz }\\frac{x^2-16}{x^2-5x+4}\\text{ definován?}",
    "moznosti": [
      "\\text{x=1}",
      "\\text{x=4}",
      "x\\in\\{1,4\\}",
      "x\\in\\{-4,4\\}"
    ],
    "spravna": 2,
    "postup": [
      "x^2-5x+4=(x-1)(x-4).\\quad \\text{Oba kořeny jmenovatele jsou vyloučeny.}"
    ],
    "typickaChyba": "Zkrácení výrazu nevrací vyloučený bod do definičního oboru.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-04",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-mocniny",
    "podtemaNazev": "Mocniny a odmocniny",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Je-li }2^u=5,\\text{ čemu se rovná }2^{2u-1}?",
    "moznosti": [
      "\\text{10}",
      "\\frac52",
      "\\text{24}",
      "\\frac{25}{2}"
    ],
    "spravna": 3,
    "postup": [
      "2^{2u-1}=\\frac{(2^u)^2}{2}=\\frac{25}{2}."
    ],
    "typickaChyba": "Odčítání v exponentu znamená dělení mocnin.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-05",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-abs",
    "podtemaNazev": "Absolutní hodnota",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro }-3<x<2\\text{ zjednodušte }\\lvert x+3\\rvert-\\lvert x-2\\rvert.",
    "moznosti": [
      "\\text{2x+1}",
      "\\text{5}",
      "\\text{1}",
      "\\text{2x-1}"
    ],
    "spravna": 0,
    "postup": [
      "x+3>0,\\ x-2<0.\\quad (x+3)-(2-x)=2x+1."
    ],
    "typickaChyba": "Při odstraňování absolutní hodnoty rozhoduje znaménko jejího vnitřku.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-06",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-upravy",
    "podtemaNazev": "Úpravy výrazů",
    "obtiznost": 4,
    "druh": "scio",
    "zadani": "\\text{Pro }t+\\frac1t=4\\text{ určete }t^2+\\frac1{t^2}.",
    "moznosti": [
      "\\text{12}",
      "\\text{14}",
      "\\text{16}",
      "\\text{18}"
    ],
    "spravna": 1,
    "postup": [
      "\\left(t+\\frac1t\\right)^2=t^2+2+\\frac1{t^2}=16."
    ],
    "typickaChyba": "Smíšený člen je zde roven dvěma.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-07",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-mnohocleny",
    "podtemaNazev": "Mnohočleny a vzorce",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Jaké }k\\text{ zajistí dělitelnost mnohočlenu }x^3+kx-10\\text{ výrazem }x-2?",
    "moznosti": [
      "\\text{5}",
      "\\text{-5}",
      "\\text{1}",
      "\\text{-1}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Dosadíme kořen dělitele: }8+2k-10=0\\Rightarrow k=1."
    ],
    "typickaChyba": "Dělitel x − 2 odpovídá dosazení kladné dvojky.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-08",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-lomene",
    "podtemaNazev": "Lomené výrazy",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro }x\\ne0,\\ x\\ne y\\text{ zjednodušte }\\frac{x^2-xy}{x^2}\\cdot\\frac{x}{x-y}.",
    "moznosti": [
      "\\text{x}",
      "\\frac1x",
      "\\text{x-y}",
      "\\text{1}"
    ],
    "spravna": 3,
    "postup": [
      "\\frac{x(x-y)}{x^2}\\cdot\\frac{x}{x-y}=1."
    ],
    "typickaChyba": "Krátíme celé činitele a zachováváme podmínky.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-09",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-mocniny",
    "podtemaNazev": "Mocniny a odmocniny",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro }a<0\\text{ zjednodušte }\\sqrt{9a^2}-2a.",
    "moznosti": [
      "\\text{-5a}",
      "\\text{a}",
      "\\text{-a}",
      "\\text{5a}"
    ],
    "spravna": 0,
    "postup": [
      "\\sqrt{9a^2}=3\\lvert a\\rvert=-3a.\\quad -3a-2a=-5a."
    ],
    "typickaChyba": "Odmocnina ze čtverce je absolutní hodnota.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "vyrazy-original-2026-10",
    "okruh": "vyrazy",
    "tema": "vyrazy",
    "podtema": "vyr-upravy",
    "podtemaNazev": "Úpravy výrazů",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Operace je definována }a\\star b=a+2b-ab.\\text{ Určete }(3\\star2)\\star4.",
    "moznosti": [
      "\\text{1}",
      "\\text{5}",
      "\\text{-3}",
      "\\text{9}"
    ],
    "spravna": 1,
    "postup": [
      "3\\star2=3+4-6=1.\\quad 1\\star4=1+8-4=5."
    ],
    "typickaChyba": "Nově definovaná operace nemusí být asociativní.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-01",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-soustavy",
    "podtemaNazev": "Soustavy rovnic",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Na workshop přišlo 26 lidí. Základní vstup stojí 120 Kč a rozšířený 180 Kč. Tržba byla 3 780 Kč. Kolik lidí mělo rozšířený vstup?}",
    "moznosti": [
      "\\text{11}",
      "\\text{15}",
      "\\text{9}",
      "\\text{13}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Kdyby všichni platili základní vstup, tržba by byla 3 120 Kč. Rozdíl 660 Kč odpovídá 660/60 = 11 rozšířeným vstupům.}"
    ],
    "typickaChyba": "Rozdíl tržeb dělíme rozdílem cen vstupů.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-02",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-linearni",
    "podtemaNazev": "Lineární rovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{První čerpadlo naplní nádrž za 6 hodin, druhé za 3 hodiny. První běží samo hodinu, pak zapneme i druhé. Za kolik hodin od začátku bude plná?}",
    "moznosti": [
      "\\text{3}",
      "\\frac83",
      "\\text{2}",
      "\\frac53"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Po hodině zbývá 5/6 nádrže. Společně plní rychlostí 1/2 nádrže za hodinu, tedy ještě 5/3 hodiny. Celkem 8/3 hodiny.}"
    ],
    "typickaChyba": "Je nutné přičíst počáteční hodinu.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-03",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-kvadrat",
    "podtemaNazev": "Kvadratické rovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Rovnice }x^2-7x+c=0\\text{ má kořeny lišící se o 3. Určete }c.",
    "moznosti": [
      "\\text{4}",
      "\\text{21}",
      "\\text{10}",
      "\\text{12}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Součet kořenů je 7, rozdíl 3. Kořeny jsou 5 a 2, jejich součin je }c=10."
    ],
    "typickaChyba": "Součin kořenů určuje absolutní člen, nikoli jejich rozdíl.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-04",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-param",
    "podtemaNazev": "Rovnice s parametrem",
    "obtiznost": 4,
    "druh": "scio",
    "zadani": "\\text{Pro které }p\\text{ má rovnice }(p-2)x=p^2-4\\text{ nekonečně mnoho řešení?}",
    "moznosti": [
      "\\text{-2}",
      "\\text{0}",
      "\\text{4}",
      "\\text{2}"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Obě strany musí být identicky nulové. Pro }p=2\\text{ dostaneme }0x=0."
    ],
    "typickaChyba": "Před dělením výrazem s parametrem prověřte jeho nulovost.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-05",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-iraci",
    "podtemaNazev": "Iracionální rovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik reálných řešení má }\\sqrt{x+6}=x?",
    "moznosti": [
      "\\text{1}",
      "\\text{0}",
      "\\text{2}",
      "\\text{3}"
    ],
    "spravna": 0,
    "postup": [
      "x\\ge0,\\quad x+6=x^2\\Rightarrow(x-3)(x+2)=0.\\quad \\text{Vyhoví pouze }x=3."
    ],
    "typickaChyba": "Umocnění může přidat neplatný kořen.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-06",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-exp",
    "podtemaNazev": "Exponenciální rovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Řešte }3^{x+1}+3^x=108.",
    "moznosti": [
      "\\frac{27}4",
      "\\text{3}",
      "\\text{2}",
      "\\text{4}"
    ],
    "spravna": 1,
    "postup": [
      "4\\cdot3^x=108\\Rightarrow3^x=27\\Rightarrow x=3."
    ],
    "typickaChyba": "Mocniny se stejným základem při sčítání nevynásobíme.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-07",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-log",
    "podtemaNazev": "Logaritmické rovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Řešte }\\log_2(x-1)+\\log_2(x+1)=3.",
    "moznosti": [
      "\\text{-3}",
      "\\text{4}",
      "\\text{3}",
      "\\sqrt7"
    ],
    "spravna": 2,
    "postup": [
      "x>1,\\quad \\log_2(x^2-1)=3\\Rightarrow x^2=9.\\quad x=3."
    ],
    "typickaChyba": "Záporný kořen porušuje podmínky logaritmů.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-08",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-nerov",
    "podtemaNazev": "Nerovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik celých čísel splňuje }\\frac{x-2}{x+1}<0?",
    "moznosti": [
      "\\text{3}",
      "\\text{1}",
      "\\text{4}",
      "\\text{2}"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Výraz je záporný právě pro }-1<x<2.\\text{ Celá řešení jsou }0,1."
    ],
    "typickaChyba": "Pól ani nulový čitatel do řešení ostré nerovnice nepatří.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-09",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-nerov",
    "podtemaNazev": "Nerovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik celých čísel splňuje }\\lvert2x-3\\rvert\\le5?",
    "moznosti": [
      "\\text{6}",
      "\\text{5}",
      "\\text{4}",
      "\\text{7}"
    ],
    "spravna": 0,
    "postup": [
      "-5\\le2x-3\\le5\\Rightarrow-1\\le x\\le4.\\quad \\text{Je jich šest.}"
    ],
    "typickaChyba": "V uzavřeném celočíselném intervalu počítáme oba konce.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "rovnice-original-2026-10",
    "okruh": "rovnice",
    "tema": "rovnice",
    "podtema": "rovn-gonio",
    "podtemaNazev": "Goniometrické rovnice",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik řešení má }2\\sin x=1\\text{ v intervalu }[0;2\\pi]?",
    "moznosti": [
      "\\text{4}",
      "\\text{2}",
      "\\text{1}",
      "\\text{3}"
    ],
    "spravna": 1,
    "postup": [
      "\\sin x=\\frac12\\Rightarrow x=\\frac\\pi6\\text{ nebo }\\frac{5\\pi}6.\\text{ Krajní body nevyhovují.}"
    ],
    "typickaChyba": "Sinus stejné kladné hodnoty nabývá ve dvou kvadrantech.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-01",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-graf",
    "podtemaNazev": "Grafy a průsečíky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Půjčovna A účtuje 90 Kč plus 35 Kč za hodinu, půjčovna B 150 Kč plus 25 Kč za hodinu. Od kolika celých hodin je B levnější?}",
    "moznosti": [
      "\\text{7}",
      "\\text{6}",
      "\\text{5}",
      "\\text{8}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{150 + 25h < 90 + 35h znamená h > 6. Nejmenší celý počet je 7.}"
    ],
    "typickaChyba": "Při šesti hodinách jsou ceny stejné, B ještě není levnější.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-02",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-kvadrat",
    "podtemaNazev": "Kvadratické funkce",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Jaká je největší hodnota }f(x)=12x-x^2\\text{ pro }x\\in\\mathbb R?",
    "moznosti": [
      "\\text{144}",
      "\\text{36}",
      "\\text{12}",
      "\\text{6}"
    ],
    "spravna": 1,
    "postup": [
      "f(x)=36-(x-6)^2\\le36.\\quad \\text{Rovnost nastává pro }x=6."
    ],
    "typickaChyba": "Souřadnice vrcholu x není hodnotou maxima.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-03",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-defobor",
    "podtemaNazev": "Definiční obor",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Určete definiční obor }f(x)=\\frac{\\sqrt{5-x}}{x-2}.",
    "moznosti": [
      "\\text{[2;5]}",
      "\\text{(2;5)}",
      "(-\\infty;2)\\cup(2;5]",
      "(-\\infty;5]"
    ],
    "spravna": 2,
    "postup": [
      "5-x\\ge0\\Rightarrow x\\le5.\\quad x-2\\ne0\\Rightarrow x\\ne2."
    ],
    "typickaChyba": "Podmínky odmocniny a jmenovatele musí platit současně.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-04",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-inverze",
    "podtemaNazev": "Inverzní funkce",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Funkce }f(x)=\\frac{3x-4}{2}\\text{ převede vstup na 7. Jaký byl vstup?}",
    "moznosti": [
      "\\frac{17}2",
      "\\frac{10}3",
      "\\text{5}",
      "\\text{6}"
    ],
    "spravna": 3,
    "postup": [
      "\\frac{3x-4}{2}=7\\Rightarrow3x=18\\Rightarrow x=6."
    ],
    "typickaChyba": "Při obracení operací měníme také jejich pořadí.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-05",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-slozena",
    "podtemaNazev": "Složené funkce",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro }f(x)=x^2-1,\\ g(x)=2x+3\\text{ určete }f(g(-2)).",
    "moznosti": [
      "\\text{0}",
      "\\text{9}",
      "\\text{-6}",
      "\\text{3}"
    ],
    "spravna": 0,
    "postup": [
      "g(-2)=-1,\\quad f(-1)=(-1)^2-1=0."
    ],
    "typickaChyba": "Pořadí skládání funkcí nelze prohodit.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-06",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-graf",
    "podtemaNazev": "Grafy a průsečíky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik společných bodů mají grafy }y=\\lvert x\\rvert\\text{ a }y=x+2?",
    "moznosti": [
      "\\text{3}",
      "\\text{1}",
      "\\text{0}",
      "\\text{2}"
    ],
    "spravna": 1,
    "postup": [
      "x\\ge0:\\ x=x+2\\text{ nemá řešení. }x<0:\\ -x=x+2\\Rightarrow x=-1."
    ],
    "typickaChyba": "Absolutní hodnotu je třeba rozdělit podle znaménka x.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-07",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-exp-log",
    "podtemaNazev": "Exponenciální a logaritmické funkce",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Graf }y=\\log_3x\\text{ posuneme o 2 doprava. Pro jaké }x\\text{ má nový graf hodnotu 1?}",
    "moznosti": [
      "\\text{3}",
      "\\text{9}",
      "\\text{5}",
      "\\text{1}"
    ],
    "spravna": 2,
    "postup": [
      "y=\\log_3(x-2).\\quad \\log_3(x-2)=1\\Rightarrow x-2=3\\Rightarrow x=5."
    ],
    "typickaChyba": "Posun doprava znamená odečíst číslo uvnitř argumentu.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-08",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-hodnoty",
    "podtemaNazev": "Obor hodnot a extrémy",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Jaký je obor hodnot }f(x)=2+\\frac1{x^2+1}\\text{ na }\\mathbb R?",
    "moznosti": [
      "\\text{[2;3]}",
      "\\text{(2;3)}",
      "\\text{[1;3]}",
      "\\text{(2;3]}"
    ],
    "spravna": 3,
    "postup": [
      "x^2+1\\ge1\\Rightarrow0<\\frac1{x^2+1}\\le1.\\quad 2<f(x)\\le3."
    ],
    "typickaChyba": "Hodnotě 2 se funkce blíží, ale nenabývá jí.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-09",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-vlastnosti",
    "podtemaNazev": "Vlastnosti funkcí",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Která z funkcí je lichá?}",
    "moznosti": [
      "f(x)=x^3-2x",
      "f(x)=x^2+x",
      "f(x)=\\lvert x\\rvert",
      "f(x)=x^3+1"
    ],
    "spravna": 0,
    "postup": [
      "f(-x)=-x^3+2x=-f(x).\\quad\\text{Ostatní předpisy podmínku lichosti nesplňují.}"
    ],
    "typickaChyba": "Lichost znamená souměrnost podle počátku, nikoli podle osy y.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "funkce-original-2026-10",
    "okruh": "funkce",
    "tema": "funkce",
    "podtema": "funk-exp-log",
    "podtemaNazev": "Exponenciální a logaritmické funkce",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kultura má na začátku 500 buněk a každé 3 hodiny se počet zdvojnásobí. Kolik buněk bude mít za 12 hodin?}",
    "moznosti": [
      "\\text{16000}",
      "\\text{8000}",
      "\\text{4000}",
      "\\text{6000}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Za 12 hodin proběhnou čtyři zdvojnásobení. Počet je 500 krát 2 na čtvrtou, tedy 8 000.}"
    ],
    "typickaChyba": "Počet období je 12/3, nikoli 12.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-01",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-ap",
    "podtemaNazev": "Aritmetická posloupnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{V první řadě sálu je 17 míst, v každé další o 3 více. Kolik míst je celkem v prvních deseti řadách?}",
    "moznosti": [
      "\\text{305}",
      "\\text{290}",
      "\\text{320}",
      "\\text{440}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Desátá řada má 17 + 9 ⋅ 3 = 44 míst. Součet je 10 ⋅ (17 + 44)/2 = 305.}"
    ],
    "typickaChyba": "Mezi první a desátou řadou je devět přírůstků.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-02",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-ap",
    "podtemaNazev": "Aritmetická posloupnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{V aritmetické posloupnosti je }a_3=11,\\ a_8=31.\\text{ Určete }a_1.",
    "moznosti": [
      "\\text{-1}",
      "\\text{3}",
      "\\text{4}",
      "\\text{7}"
    ],
    "spravna": 1,
    "postup": [
      "5d=31-11=20\\Rightarrow d=4.\\quad a_1=11-2\\cdot4=3."
    ],
    "typickaChyba": "Rozdíl indexů určuje počet diferencí.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-03",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-ap",
    "podtemaNazev": "Aritmetická posloupnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik nejméně po sobě jdoucích kladných lichých čísel počínaje jedničkou musíme sečíst, aby součet přesáhl 200?}",
    "moznosti": [
      "\\text{16}",
      "\\text{20}",
      "\\text{15}",
      "\\text{14}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Součet prvních n lichých čísel je n na druhou. 14 na druhou je 196, 15 na druhou je 225.}"
    ],
    "typickaChyba": "Podmínka přesáhnout je ostrá nerovnost.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-04",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-gp",
    "podtemaNazev": "Geometrická posloupnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Geometrická posloupnost má }a_2=6,\\ a_5=162.\\text{ Určete }a_1.",
    "moznosti": [
      "\\text{3}",
      "\\text{18}",
      "\\frac23",
      "\\text{2}"
    ],
    "spravna": 3,
    "postup": [
      "q^3=162/6=27\\Rightarrow q=3.\\quad a_1=6/3=2."
    ],
    "typickaChyba": "Mezi druhým a pátým členem jsou tři násobení kvocientem.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-05",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-gp",
    "podtemaNazev": "Geometrická posloupnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Míč po každém dopadu vyskočí do 60 \\% předchozí výšky. Pustíme jej z 5 m. Jak vysoko vyskočí po třetím dopadu v metrech?}",
    "moznosti": [
      "\\text{1{,}08}",
      "\\text{1{,}8}",
      "\\text{3}",
      "\\text{0{,}648}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Výšky odrazů jsou 3 m, 1,8 m a 1,08 m.}"
    ],
    "typickaChyba": "Počáteční výška není prvním odrazem.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-06",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-rada",
    "podtemaNazev": "Nekonečná geometrická řada",
    "obtiznost": 4,
    "druh": "scio",
    "zadani": "\\text{Každý další čtverec má poloviční stranu oproti předchozímu. První má obsah 12. Jaký je součet obsahů všech čtverců v nekonečné řadě?}",
    "moznosti": [
      "\\text{48}",
      "\\text{16}",
      "\\text{24}",
      "\\text{18}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Poměr obsahů je 1/4. Součet geometrické řady je 12/(1 − 1/4) = 16.}"
    ],
    "typickaChyba": "Poměr stran není poměrem obsahů.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-07",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-finance",
    "podtemaNazev": "Finanční matematika",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Vklad 10 000 Kč se na konci každého roku zvýší o 10 \\%. Hned po prvním připsání vybereme 2 000 Kč. Kolik bude na účtu po druhém připsání? Poplatky a daně neuvažujte.}",
    "moznosti": [
      "\\text{8800}",
      "\\text{12100}",
      "\\text{9900}",
      "\\text{10100}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Po prvním připsání a výběru zbývá 11 000 − 2 000 = 9 000 Kč. Další růst dá 9 900 Kč.}"
    ],
    "typickaChyba": "Výběr mění základ pro další úročení.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-08",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-ap",
    "podtemaNazev": "Aritmetická posloupnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{V aritmetické posloupnosti platí }a_4+a_{10}=50.\\text{ Určete }a_7.",
    "moznosti": [
      "\\text{50}",
      "\\text{20}",
      "\\text{30}",
      "\\text{25}"
    ],
    "spravna": 3,
    "postup": [
      "a_4+a_{10}=2a_7\\Rightarrow a_7=25."
    ],
    "typickaChyba": "Prostřední člen je průměrem členů stejně vzdálených.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-09",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-gp",
    "podtemaNazev": "Geometrická posloupnost",
    "obtiznost": 4,
    "druh": "scio",
    "zadani": "\\text{Tři po sobě jdoucí členy geometrické posloupnosti jsou }x,12,27.\\text{ Určete }x.",
    "moznosti": [
      "\\frac{16}3",
      "\\frac{27}4",
      "\\text{3}",
      "\\frac49"
    ],
    "spravna": 0,
    "postup": [
      "12^2=27x\\Rightarrow x=144/27=16/3."
    ],
    "typickaChyba": "V geometrické posloupnosti neplatí vztah pro aritmetický průměr.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "posloupnosti-original-2026-10",
    "okruh": "posloupnosti",
    "tema": "posloupnosti",
    "podtema": "posl-limita",
    "podtemaNazev": "Limita posloupnosti",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Určete }\\lim_{n\\to\\infty}\\frac{5n^2-n}{2n^2+7}.",
    "moznosti": [
      "\\infty",
      "\\frac52",
      "\\text{0}",
      "\\text{5}"
    ],
    "spravna": 1,
    "postup": [
      "\\frac{5-1/n}{2+7/n^2}\\longrightarrow\\frac52."
    ],
    "typickaChyba": "U polynomů stejného stupně rozhodují vedoucí koeficienty.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-01",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-podobnost",
    "podtemaNazev": "Shodnost a podobnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Dva podobné trojúhelníky mají obsahy v poměru 9 : 25. Menší má obvod 24 cm. Jaký obvod má větší?}",
    "moznosti": [
      "40\\text{ cm}",
      "\\frac{200}3\\text{ cm}",
      "32\\text{ cm}",
      "72\\text{ cm}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Poměr délek je 3 : 5. Větší obvod je 24 ⋅ 5/3 = 40 cm.}"
    ],
    "typickaChyba": "Poměr obsahů je druhou mocninou poměru délek.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-02",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-trojuhelniky",
    "podtemaNazev": "Trojúhelníky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pravoúhlý trojúhelník má odvěsny 9 a 12 cm. Jaká je výška na přeponu?}",
    "moznosti": [
      "15\\text{ cm}",
      "7{,}2\\text{ cm}",
      "6\\text{ cm}",
      "8\\text{ cm}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Přepona má délku 15 cm. Ze shody obsahů 9 ⋅ 12/2 = 15 ⋅ v/2 plyne v = 7,2 cm.}"
    ],
    "typickaChyba": "Výška na přeponu není jednou z odvěsen.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-03",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-obsahy",
    "podtemaNazev": "Obvody a obsahy",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Obdélník má obvod 40 cm. Jedna strana je o 4 cm delší než druhá. Jaký je jeho obsah?}",
    "moznosti": [
      "100\\text{ cm}^2",
      "192\\text{ cm}^2",
      "96\\text{ cm}^2",
      "84\\text{ cm}^2"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Součet stran je 20, rozdíl 4. Strany jsou 12 a 8 cm, obsah 96.}"
    ],
    "typickaChyba": "Obvod je dvojnásobkem součtu sousedních stran.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-04",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-kruznice",
    "podtemaNazev": "Kružnice a kruh",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kruh má poloměr 6 cm. Tětiva je od středu vzdálena 3 cm. Jaká je její délka?}",
    "moznosti": [
      "3\\sqrt3\\text{ cm}",
      "6\\text{ cm}",
      "9\\text{ cm}",
      "6\\sqrt3\\text{ cm}"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Polovina tětivy má délku odmocnina z (36 − 9), tedy 3 odmocniny ze 3. Celá tětiva je dvojnásobná.}"
    ],
    "typickaChyba": "Kolmice ze středu půlí tětivu.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-05",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-mnohouhelniky",
    "podtemaNazev": "Mnohoúhelníky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pravidelný mnohoúhelník má vnitřní úhel 156 stupňů. Kolik má stran?}",
    "moznosti": [
      "\\text{15}",
      "\\text{12}",
      "\\text{18}",
      "\\text{24}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Vnější úhel je 180 − 156 = 24 stupňů. Počet stran je 360/24 = 15.}"
    ],
    "typickaChyba": "Součet vnějších úhlů je 360 stupňů.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-06",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-obsahy",
    "podtemaNazev": "Obvody a obsahy",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Čtverec má úhlopříčku 10 cm. Spojíme středy jeho stran. Jaký obsah má vzniklý vnitřní čtverec?}",
    "moznosti": [
      "12{,}5\\text{ cm}^2",
      "25\\text{ cm}^2",
      "50\\text{ cm}^2",
      "100\\text{ cm}^2"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Původní čtverec má obsah 10 na druhou děleno 2, tedy 50. Spojením středů vznikne čtverec s polovičním obsahem, tedy 25.}"
    ],
    "typickaChyba": "Úhlopříčku nesmíme považovat za stranu původního čtverce.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-07",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-trigonometrie",
    "podtemaNazev": "Trigonometrie",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Dvě strany trojúhelníku měří 8 a 10 cm a svírají úhel 30 stupňů. Jaký je obsah?}",
    "moznosti": [
      "20\\sqrt3\\text{ cm}^2",
      "80\\text{ cm}^2",
      "20\\text{ cm}^2",
      "40\\text{ cm}^2"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Obsah je polovina součinu stran a sinu sevřeného úhlu: 8 ⋅ 10 ⋅ 0,5/2 = 20.}"
    ],
    "typickaChyba": "Vzorec pro obsah zahrnuje faktor jedna polovina.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-08",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-podobnost",
    "podtemaNazev": "Shodnost a podobnost",
    "obtiznost": 4,
    "druh": "scio",
    "zadani": "\\text{V trojúhelníku ABC leží D na AB a E na AC, přičemž DE je rovnoběžná s BC a AD : DB = 2 : 3. Jaký díl obsahu ABC tvoří čtyřúhelník DBCE?}",
    "moznosti": [
      "\\frac9{25}",
      "\\frac35",
      "\\frac4{25}",
      "\\frac{21}{25}"
    ],
    "spravna": 3,
    "postup": [
      "\\text{AD/AB=2/5. Malý trojúhelník má 4/25 celkového obsahu, zbývající čtyřúhelník tedy 21/25.}"
    ],
    "typickaChyba": "Poměr AD : DB není poměrem AD : AB.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-09",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-kruznice",
    "podtemaNazev": "Kružnice a kruh",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kruhová výseč má poloměr 9 cm a délku oblouku 6 cm. Jaký je její obsah?}",
    "moznosti": [
      "27\\text{ cm}^2",
      "54\\text{ cm}^2",
      "18\\text{ cm}^2",
      "9\\pi\\text{ cm}^2"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Obsah výseče je polovina součinu poloměru a délky oblouku: 9 ⋅ 6/2 = 27.}"
    ],
    "typickaChyba": "Délka oblouku není obvod celé výseče.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "planimetrie-original-2026-10",
    "okruh": "planimetrie",
    "tema": "planimetrie",
    "podtema": "plani-trojuhelniky",
    "podtemaNazev": "Trojúhelníky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Dvě strany trojúhelníku mají délky 5 a 11 cm. Kolik celočíselných délek může mít třetí strana v centimetrech?}",
    "moznosti": [
      "\\text{8}",
      "\\text{9}",
      "\\text{10}",
      "\\text{11}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Trojúhelníková nerovnost dává 6 < c < 16. Vyhovují čísla 7 až 15, celkem devět.}"
    ],
    "typickaChyba": "Rovnost v trojúhelníkové nerovnosti netvoří trojúhelník.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-01",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-objem",
    "podtemaNazev": "Objem a povrch těles",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Hrany kvádru mají poměr 2 : 3 : 4 a objem 648 cm krychlových. Jaký je jeho povrch?}",
    "moznosti": [
      "468\\text{ cm}^2",
      "432\\text{ cm}^2",
      "216\\text{ cm}^2",
      "648\\text{ cm}^2"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Hrany jsou 2k, 3k, 4k. Z 24k na třetí = 648 vychází k = 3. Povrch je 2 ⋅ (6 ⋅ 9 + 6 ⋅ 12 + 9 ⋅ 12) = 468.}"
    ],
    "typickaChyba": "Poměr hran nestačí přímo dosadit jako jejich délky.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-02",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-objem",
    "podtemaNazev": "Objem a povrch těles",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Poloměr válce zvětšíme o 50 \\% a výšku zmenšíme na polovinu. Jak se změní objem?}",
    "moznosti": [
      "\\text{Vzroste o }50\\%.",
      "\\text{Vzroste o }12{,}5\\%.",
      "\\text{Klesne o }25\\%.",
      "\\text{Nezmění se.}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Poměr objemů je 1,5 na druhou krát 0,5 = 1,125.}"
    ],
    "typickaChyba": "Poloměr vystupuje ve vzorci pro objem ve druhé mocnině.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-03",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-objem",
    "podtemaNazev": "Objem a povrch těles",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Krychli o hraně 4 cm natřeme ze všech stran a rozřežeme na krychličky o hraně 1 cm. Kolik z nich má natřené právě dvě stěny?}",
    "moznosti": [
      "\\text{32}",
      "\\text{16}",
      "\\text{24}",
      "\\text{8}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Právě dvě natřené stěny mají krychličky uvnitř hran. Na každé z 12 hran jsou 4 − 2 = 2 takové krychličky. Celkem 24.}"
    ],
    "typickaChyba": "Rohové krychličky mají natřené tři stěny.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-04",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-polohove",
    "podtemaNazev": "Polohové a metrické vztahy",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kvádr má hrany 4, 4 a 7 cm. Jaká je jeho tělesová úhlopříčka?}",
    "moznosti": [
      "\\sqrt{65}\\text{ cm}",
      "11\\text{ cm}",
      "\\sqrt{57}\\text{ cm}",
      "9\\text{ cm}"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Druhá mocnina tělesové úhlopříčky je 16 + 16 + 49 = 81. Úhlopříčka má délku 9 cm.}"
    ],
    "typickaChyba": "Tělesová úhlopříčka využívá všechny tři rozměry.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-05",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-objem",
    "podtemaNazev": "Objem a povrch těles",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kužel a válec mají stejný poloměr podstavy. Kužel má třikrát větší výšku než válec. Jaký je poměr jejich objemů, kužel : válec?}",
    "moznosti": [
      "\\text{1:1}",
      "\\text{1:3}",
      "\\text{3:1}",
      "\\text{1:9}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Objem kužele je jedna třetina obsahu podstavy krát trojnásobná výška válce. Objemy jsou stejné.}"
    ],
    "typickaChyba": "Koeficient jedna třetina kompenzuje trojnásobnou výšku.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-06",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-objem",
    "podtemaNazev": "Objem a povrch těles",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Z koule vytvoříme bez ztrát osm stejných menších koulí. Jaký je součet jejich povrchů vůči původnímu povrchu?}",
    "moznosti": [
      "\\text{Osminásobný.}",
      "\\text{Dvojnásobný.}",
      "\\text{Stejný.}",
      "\\text{Čtyřnásobný.}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Každá koule má osminový objem a poloviční poloměr, tedy čtvrtinový povrch. Osm čtvrtin je dvojnásobek.}"
    ],
    "typickaChyba": "Objemy a povrchy se mění s různými mocninami poloměru.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-07",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-polohove",
    "podtemaNazev": "Polohové a metrické vztahy",
    "obtiznost": 4,
    "druh": "scio",
    "zadani": "\\text{Pravidelný čtyřboký jehlan má podstavnou hranu 6 cm a výšku 4 cm. Jaký je jeho celkový povrch?}",
    "moznosti": [
      "108\\text{ cm}^2",
      "120\\text{ cm}^2",
      "96\\text{ cm}^2",
      "84\\text{ cm}^2"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Výška boční stěny je odmocnina z (4 na druhou + 3 na druhou), tedy 5. Plášť má obsah 4 ⋅ 6 ⋅ 5/2 = 60, podstava 36. Celkem 96.}"
    ],
    "typickaChyba": "Výška tělesa není výškou boční stěny.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-08",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-objem",
    "podtemaNazev": "Objem a povrch těles",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{V nádobě se čtvercovým dnem 20 krát 20 cm stoupne po úplném ponoření předmětu hladina o 3 cm. Jaký je objem předmětu? Voda nepřetekla.}",
    "moznosti": [
      "400\\text{ cm}^3",
      "60\\text{ cm}^3",
      "2400\\text{ cm}^3",
      "1200\\text{ cm}^3"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Vytlačený objem vody je obsah dna krát vzestup hladiny, tedy 400 ⋅ 3 = 1 200 cm krychlových.}"
    ],
    "typickaChyba": "Rozhoduje vzestup hladiny, nikoli její konečná výška.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-09",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-polohove",
    "podtemaNazev": "Polohové a metrické vztahy",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik přímek obsahujících hrany krychle je mimoběžných s přímkou obsahující jednu z jejích hran?}",
    "moznosti": [
      "\\text{4}",
      "\\text{3}",
      "\\text{6}",
      "\\text{8}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Z ostatních 11 hran jsou 3 rovnoběžné a 4 protínají zvolenou přímku. Zbývají 4 mimoběžné.}"
    ],
    "typickaChyba": "Rovnoběžné přímky nejsou mimoběžné.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "stereometrie-original-2026-10",
    "okruh": "stereometrie",
    "tema": "stereometrie",
    "podtema": "stereo-objem",
    "podtemaNazev": "Objem a povrch těles",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kvádr vznikl slepením tří krychlí o hraně 2 cm do jedné řady celými stěnami. Jaký je povrch výsledného tělesa?}",
    "moznosti": [
      "48\\text{ cm}^2",
      "56\\text{ cm}^2",
      "72\\text{ cm}^2",
      "64\\text{ cm}^2"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Rozměry kvádru jsou 6, 2, 2 cm. Povrch je 2 ⋅ (12 + 12 + 4) = 56.}"
    ],
    "typickaChyba": "Slepené stěny nejsou součástí vnějšího povrchu.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-01",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-vektory",
    "podtemaNazev": "Vektory",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Body }A=(-3;2), B=(5;6).\\text{ Bod }C\\text{ je střed AB. Určete }\\overrightarrow{AC}.",
    "moznosti": [
      "\\text{(4;2)}",
      "\\text{(1;4)}",
      "\\text{(8;4)}",
      "\\text{(-4;-2)}"
    ],
    "spravna": 0,
    "postup": [
      "C=(1;4),\\quad\\overrightarrow{AC}=C-A=(4;2)."
    ],
    "typickaChyba": "Souřadnice středu nejsou souřadnicemi vektoru.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-02",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-vektory",
    "podtemaNazev": "Vektory",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro které }t\\text{ jsou vektory }(t;3)\\text{ a }(6;-4)\\text{ kolmé?}",
    "moznosti": [
      "\\text{8}",
      "\\text{2}",
      "\\text{-2}",
      "\\frac12"
    ],
    "spravna": 1,
    "postup": [
      "6t-12=0\\Rightarrow t=2."
    ],
    "typickaChyba": "Kolmost určujeme nulovým skalárním součinem.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-03",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-primka",
    "podtemaNazev": "Přímka",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Přímka prochází }(2;5)\\text{ a je rovnoběžná s }y=-3x+1.\\text{ Kde protíná osu }y?",
    "moznosti": [
      "\\text{(0;7)}",
      "\\text{(0;5)}",
      "\\text{(0;11)}",
      "\\text{(0;-1)}"
    ],
    "spravna": 2,
    "postup": [
      "y=-3x+b,\\quad5=-6+b\\Rightarrow b=11."
    ],
    "typickaChyba": "Rovnoběžky mají stejnou směrnici, nikoli absolutní člen.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-04",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-vzdal",
    "podtemaNazev": "Vzdálenosti a odchylky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Jaká je vzdálenost bodu }(1;1)\\text{ od přímky }3x+4y-17=0?",
    "moznosti": [
      "\\text{10}",
      "\\frac{10}7",
      "\\frac25",
      "\\text{2}"
    ],
    "spravna": 3,
    "postup": [
      "d=\\frac{\\lvert3+4-17\\rvert}{\\sqrt{3^2+4^2}}=\\frac{10}{5}=2."
    ],
    "typickaChyba": "Čitatel vzdálenosti musí být v absolutní hodnotě.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-05",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-kuzel",
    "podtemaNazev": "Kuželosečky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kružnice má rovnici }x^2+y^2-6x+4y-12=0.\\text{ Jaký je poloměr?}",
    "moznosti": [
      "\\text{5}",
      "\\sqrt{12}",
      "\\text{13}",
      "\\text{25}"
    ],
    "spravna": 0,
    "postup": [
      "(x-3)^2+(y+2)^2=25\\Rightarrow r=5."
    ],
    "typickaChyba": "Pravá strana středového tvaru je druhá mocnina poloměru.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-06",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-primka",
    "podtemaNazev": "Přímka",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Který bod leží na přímce }(x;y)=(1;4)+t(2;-3)?",
    "moznosti": [
      "\\text{(2;1)}",
      "\\text{(5;-2)}",
      "\\text{(3;7)}",
      "\\text{(-1;1)}"
    ],
    "spravna": 1,
    "postup": [
      "t=2\\Rightarrow(x;y)=(5;-2).\\quad\\text{Ostatní body nedávají shodné }t\\text{ v obou souřadnicích.}"
    ],
    "typickaChyba": "Stejný parametr musí vyhovět oběma souřadnicím.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-07",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-rovina",
    "podtemaNazev": "Rovina",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pro které }k\\text{ leží bod }(2;-1;k)\\text{ v rovině }2x-y+3z=14?",
    "moznosti": [
      "\\text{5}",
      "\\text{-3}",
      "\\text{3}",
      "\\frac{11}3"
    ],
    "spravna": 2,
    "postup": [
      "4+1+3k=14\\Rightarrow3k=9\\Rightarrow k=3."
    ],
    "typickaChyba": "Pozor na odečítání záporné souřadnice.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-08",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-vzdal",
    "podtemaNazev": "Vzdálenosti a odchylky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Bod }P=(a;0)\\text{ má stejnou vzdálenost od }A=(0;2)\\text{ a }B=(6;4).\\text{ Určete }a.",
    "moznosti": [
      "\\text{3}",
      "\\text{5}",
      "\\text{2}",
      "\\text{4}"
    ],
    "spravna": 3,
    "postup": [
      "a^2+4=(a-6)^2+16\\Rightarrow12a=48\\Rightarrow a=4."
    ],
    "typickaChyba": "Rovnost vzdáleností lze řešit rovností jejich druhých mocnin.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-09",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-kuzel",
    "podtemaNazev": "Kuželosečky",
    "obtiznost": 4,
    "druh": "scio",
    "zadani": "\\text{Kolik společných bodů má kružnice }x^2+y^2=20\\text{ s přímkou }y=2x?",
    "moznosti": [
      "\\text{2}",
      "\\text{0}",
      "\\text{1}",
      "\\text{4}"
    ],
    "spravna": 0,
    "postup": [
      "x^2+4x^2=20\\Rightarrow x=\\pm2.\\quad\\text{Body jsou }(2;4),(-2;-4)."
    ],
    "typickaChyba": "Obě znaménka odmocniny dávají různé průsečíky.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "analyticka-original-2026-10",
    "okruh": "analyticka",
    "tema": "analyticka",
    "podtema": "anal-vektory",
    "podtemaNazev": "Vektory",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Body }A=(1;2), B=(5;3), C=(7;8)\\text{ jsou po řadě vrcholy rovnoběžníku ABCD. Určete D.}",
    "moznosti": [
      "\\text{(2;5)}",
      "\\text{(3;7)}",
      "\\text{(11;9)}",
      "\\text{(-1;-3)}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{D=A+C-B=(1+7-5;2+8-3)=(3;7).}"
    ],
    "typickaChyba": "Pořadí vrcholů určuje, které body jsou protilehlé.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-01",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-pravidla",
    "podtemaNazev": "Kombinatorická pravidla a skupiny",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Kolik čtyřmístných kódů lze sestavit z číslic 0 až 5 bez opakování, má-li být poslední číslice sudá? Kód smí začínat nulou.}",
    "moznosti": [
      "\\text{180}",
      "\\text{120}",
      "\\text{360}",
      "\\text{150}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Poslední číslice má 3 možnosti. Zbývající pozice mají postupně 5, 4, 3 možnosti. Součin je 180.}"
    ],
    "typickaChyba": "Kód může začínat nulou, nejde o čtyřciferné číslo.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-02",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-pravidla",
    "podtemaNazev": "Kombinatorická pravidla a skupiny",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Ze šesti lidí volíme tříčlenný tým. Eva a Filip v něm nesmějí být současně. Kolik týmů lze sestavit?}",
    "moznosti": [
      "\\text{10}",
      "\\text{16}",
      "\\text{12}",
      "\\text{18}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Všech týmů je 20. Zakázané obsahují Evu, Filipa a jednoho ze čtyř dalších, tedy 4. Zbývá 16.}"
    ],
    "typickaChyba": "U týmu nezáleží na pořadí jeho členů.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-03",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-pravdepodobnost",
    "podtemaNazev": "Pravděpodobnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{V sáčku jsou 4 červené a 3 modré žetony. Náhodně vytáhneme dva bez vracení. Jaká je pravděpodobnost různých barev?}",
    "moznosti": [
      "\\frac12",
      "\\frac{12}{49}",
      "\\frac47",
      "\\frac27"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Různobarevných dvojic je 4 ⋅ 3 = 12, všech dvojic 7 ⋅ 6/2 = 21. Poměr je 4/7.}"
    ],
    "typickaChyba": "Při tahu bez vracení se mění počet zbývajících žetonů.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-04",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-pravdepodobnost",
    "podtemaNazev": "Pravděpodobnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Hodíme dvěma spravedlivými šestistěnnými kostkami. Víme, že součet je 8. Jaká je pravděpodobnost, že na jedné padla dvojka?}",
    "moznosti": [
      "\\frac13",
      "\\frac16",
      "\\frac15",
      "\\frac25"
    ],
    "spravna": 3,
    "postup": [
      "\\text{Možnosti jsou (2,6), (3,5), (4,4), (5,3), (6,2). Dvě z pěti obsahují dvojku.}"
    ],
    "typickaChyba": "Známý součet omezuje prostor možných výsledků.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-05",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-statistika",
    "podtemaNazev": "Statistické charakteristiky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Průměr pěti výsledků je 14. Po přidání šestého výsledku je průměr 16. Jaký byl šestý výsledek?}",
    "moznosti": [
      "\\text{26}",
      "\\text{16}",
      "\\text{24}",
      "\\text{30}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Původní součet je 70, nový 96. Přidaný výsledek je 96 − 70 = 26.}"
    ],
    "typickaChyba": "Rozdíl průměrů není přidanou hodnotou.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-06",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-statistika",
    "podtemaNazev": "Statistické charakteristiky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Skupina 12 studentů má průměrný výsledek 70 bodů a skupina 18 studentů 80 bodů. Jaký je průměr všech studentů?}",
    "moznosti": [
      "\\text{78}",
      "\\text{76}",
      "\\text{75}",
      "\\text{74}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Celkem získali 12 ⋅ 70 + 18 ⋅ 80 = 2 280 bodů. Po vydělení 30 vyjde 76.}"
    ],
    "typickaChyba": "Průměry nestejně velkých skupin se váží počtem členů.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-07",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-pravidla",
    "podtemaNazev": "Kombinatorická pravidla a skupiny",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Pět různých knih řadíme do police. Dvě určené knihy mají být vedle sebe. Kolika způsoby lze knihy seřadit?}",
    "moznosti": [
      "\\text{60}",
      "\\text{120}",
      "\\text{48}",
      "\\text{24}"
    ],
    "spravna": 2,
    "postup": [
      "\\text{Dvojici bereme jako blok: čtyři objekty lze řadit 24 způsoby. V bloku jsou dvě pořadí, tedy 48.}"
    ],
    "typickaChyba": "Je nutné započítat i dvě vnitřní pořadí dvojice.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-08",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-binom",
    "podtemaNazev": "Binomická věta",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Jaký je koeficient u }x^3\\text{ v rozvoji }(x+2)^5?",
    "moznosti": [
      "\\text{10}",
      "\\text{80}",
      "\\text{20}",
      "\\text{40}"
    ],
    "spravna": 3,
    "postup": [
      "\\binom53 x^3\\cdot2^2=10\\cdot4x^3=40x^3."
    ],
    "typickaChyba": "Vedle kombinačního čísla je třeba zahrnout mocninu konstanty.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-09",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-pravdepodobnost",
    "podtemaNazev": "Pravděpodobnost",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Dva nezávislé senzory zachytí poruchu s pravděpodobnostmi 0,8 a 0,9. Jaká je pravděpodobnost, že ji zachytí alespoň jeden?}",
    "moznosti": [
      "\\text{0{,}98}",
      "\\text{0{,}72}",
      "\\text{0{,}85}",
      "\\text{0{,}17}"
    ],
    "spravna": 0,
    "postup": [
      "\\text{Ani jeden ji nezachytí s pravděpodobností 0,2 ⋅ 0,1 = 0,02. Alespoň jeden tedy s pravděpodobností 0,98.}"
    ],
    "typickaChyba": "Pravděpodobnosti překrývajících se jevů nelze jen sečíst.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  },
  {
    "id": "kombinatorika-original-2026-10",
    "okruh": "kombinatorika",
    "tema": "kombinatorika",
    "podtema": "komb-statistika",
    "podtemaNazev": "Statistické charakteristiky",
    "obtiznost": 3,
    "druh": "scio",
    "zadani": "\\text{Data 2, 4, 4, 7, 8 doplníme číslem 100. O kolik se zvýší medián?}",
    "moznosti": [
      "\\text{16}",
      "\\text{1{,}5}",
      "\\text{0}",
      "\\text{2}"
    ],
    "spravna": 1,
    "postup": [
      "\\text{Původní medián je 4. Nový je průměr třetí a čtvrté hodnoty, tedy (4 + 7)/2 = 5,5. Zvýšení je 1,5.}"
    ],
    "typickaChyba": "U sudého počtu hodnot se berou dvě prostřední hodnoty.",
    "verified": true,
    "verifiedBy": "independent-solve",
    "zdroj": "handwritten"
  }
];
