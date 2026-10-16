# Rovnice a nerovnice

Rovnice je rovnost, ve které vystupuje neznámá; řešit ji znamená najít všechna čísla, po jejichž dosazení se z rovnosti stane pravdivý výrok. Nerovnice se řeší podobně, jen výsledkem bývá interval. Ve SCIO se u rovnic nejtěžší body skrývají v úpravách, které mění množinu řešení (umocnění, násobení výrazem s neznámou), v podmínkách (jmenovatel, odmocnina, logaritmus) a v parametrech.

## Co znamená řešit rovnici

Každá úprava rovnice buď množinu řešení zachovává (ekvivalentní úprava), nebo ji mění. Cílem je dojít k tvaru, ze kterého řešení přímo přečteš, a cestou nic neztratit ani nepřidat.

> [!VETA] Ekvivalentní úpravy (množinu řešení nemění):
>
> - přičtení a odečtení téhož čísla i výrazu k oběma stranám,
> - vynásobení a vydělení obou stran týmž nenulovým číslem,
> - záměna levé a pravé strany.
>
> Neekvivalentní úpravy (množinu řešení mění):
>
> - umocnění obou stran (přidává falešné kořeny),
> - vynásobení obou stran nulou,
> - vynásobení nebo vydělení výrazem s neznámou bez rozboru jeho znaménka a nulových bodů.

> [!POZOR] Umocnění není ekvivalentní úprava. Z rovnice $a = b$ plyne $a^2 = b^2$, ale obráceně platí $a^2 = b^2$ i pro $a = -b$. Po každém umocnění proto musí následovat zkouška dosazením do původní rovnice.

Zkouška a podmínky jsou dvě strany téže mince: podmínky dopředu zužují kandidáty (např. $x \ge 0$), zkouška zpětně ověřuje ty, kteří prošli. U těžších rovnic používej obojí.

## Lineární rovnice

Rovnice $ax + b = 0$ s neznámou $x$. Postup: zbav se závorek roznásobením, zbav se zlomků vynásobením společným jmenovatelem, převeď členy s $x$ nalevo a čísla napravo, nakonec vyděl koeficientem u $x$.

$$
x = -\dfrac{b}{a}
$$

pro $a$ ≠ $0$.

Zvláštní případy po zjednodušení: tvar $0x = 5$ nemá řešení, tvar $0x = 0$ má nekonečně mnoho řešení (vyhoví každé reálné číslo).

> [!POZOR] Minus před zlomkem patří celé čitatelce: $-2(2x+1)$ je $-4x-2$, ne $-4x+2$. Druhá klasická chyba je zapomenout vynásobit jmenovatelem i osamocená čísla bez zlomku.

## Soustavy lineárních rovnic

Dvě rovnice o dvou neznámých řeš sčítací metodou (rovnice vynásob tak, aby po sečtení jedna neznámá vypadla), nebo dosazovací metodou (z jedné rovnice vyjádři neznámou a dosaď do druhé). Obě metody vedou k cíli; sčítací bývá rychlejší, když se koeficienty hezky doplňují.

Počet řešení poznáš z průběhu výpočtu: vyjde-li $0 = 5$, soustava nemá řešení; vyjde-li $0 = 0$, má jich nekonečně mnoho. Geometricky jde o dvě přímky: různoběžky (jedno řešení), rovnoběžky (žádné), totožné přímky (nekonečně mnoho).

> [!VETA] Po dosazení vždy ověř nalezenou dvojici v obou původních rovnicích. Jediná chyba ve znaménku dá dvojici, která vypadá věrohodně, ale nevyhovuje ani jedné rovnici.

U slovních úloh se soustavou si po výpočtu znovu přečti otázku: vypočítáš obě neznámé, ale ptají se často jen na jednu z nich.

## Kvadratické rovnice

Rovnice $ax^2 + bx + c = 0$ s $a$ ≠ $0$. O počtu reálných řešení rozhoduje diskriminant:

$$
D = b^2 - 4ac
$$

| Diskriminant | Počet reálných řešení |
|---|---|
| $D > 0$ | dvě různá |
| $D = 0$ | jedno (dvojnásobné) |
| $D < 0$ | žádné |

Kořeny dává vzorec:

$$
x = \dfrac{-b \pm \sqrt{D}}{2a}
$$

Vzorec funguje díky doplnění na čtverec: levou stranu lze přepsat jako $a$ krát čtverec plus zbytek, ve kterém se objeví právě $D$:

$$
ax^2 + bx + c = a\left(x + \dfrac{b}{2a}\right)^2 - \dfrac{D}{4a}
$$

Je-li $D$ kladné, čtverec se rovná kladnému číslu a dá dva kořeny; je-li $D$ záporné, rovnal by se zápornému číslu, což (v reálných číslech) nejde.

Zvláštní tvary řeš bez vzorce: pro $b = 0$ je $x^2 = -c/a$ (řešení existuje, jen když je $-c/a$ nezáporné); pro $c = 0$ vytkni $x$ před závorku ($x(ax+b) = 0$ má kořeny $x = 0$ a $x = -b/a$). Bikvadratickou rovnici převeď substitucí $t = x^2$ na kvadratickou pro $t$.

> [!POZOR] U bikvadratické rovnice se záporné hodnoty $t$ zahazují ($x^2$ je vždy nezáporné), ale z každého kladného $t$ vzniknou dva kořeny $x = \pm\sqrt{t}$. Nejčastější chyba je zapomenout jednu z těchto dvou stran.

## Vietovy vzorce

> [!VETA] Pro kořeny $x_1$ a $x_2$ rovnice $ax^2+bx+c = 0$ platí:
>
> $$
> x_1 + x_2 = -\dfrac{b}{a} \qquad x_1 x_2 = \dfrac{c}{a}
> $$
>
> Pro $a = 1$ se vzorce zkrátí na $x_1+x_2 = -b$ a $x_1 x_2 = c$.

Vieta slouží ke třem věcem: rychlé hledání kořenů zpaměti (uhádni dvojici se správným součtem a součinem), podmínky na znaménka kořenů (oba kladné: součet i součin kladný; opačná znaménka: součin záporný) a rozklad na součin $a(x-x_1)(x-x_2)$.

> [!POZOR] Vietovy vzorce samy o sobě nezaručují, že kořeny existují. Podmínka „součet kladný a součin kladný" ještě neznamená dva kladné kořeny — vždy musíš přidat $D > 0$ (u parametrů) nebo $D \ge 0$.

## Rovnice s parametrem

Parametr $k$ je číslo, jehož hodnotu neznáme; ptáme se, pro které jeho hodnoty má rovnice danou vlastnost (jedno řešení, dva kladné kořeny, žádné řešení). Postup má tři kroky:

1. Najdi „zlomové" hodnoty parametru: kde se nuluje koeficient u nejvyšší mocniny a kde je $D = 0$.
2. Každou zlomovou hodnotu vyšetři zvlášť dosazením do původní rovnice.
3. Pro ostatní hodnoty řeš rovnici obecně a podmínky zapiš jako nerovnice pro $k$.

Nelekni se odmocninových hranic (např. $3-2\sqrt{2} \approx 0{,}17$); pro zařazení do intervalu obvykle stačí hrubý odhad velikosti.

> [!POZOR] U rovnice $kx^2-4x+2 = 0$ nestačí podmínka $D = 0$ (dá $k = 2$). Pro $k = 0$ se rovnice změní na lineární $-4x+2 = 0$ s jediným řešením $x = 1/2$, takže správná odpověď je $k = 0$ nebo $k = 2$. Zlomovou hodnotu, která mění typ rovnice, nesmíš nikdy přeskočit.

## Iracionální rovnice

Rovnice s neznámou pod odmocninou. Postup:

1. Podmínky: výraz pod odmocninou je nezáporný; rovná-li se odmocnina výrazu, musí být ten výraz nezáporný.
2. Osamostatni jednu odmocninu na jedné straně rovnice.
3. Umocni obě strany a vzniklou rovnici vyřeš.
4. Každého kandidáta ověř zkouškou v původní rovnici.

> [!VETA] Odmocnina je vždy nezáporná: rovnice $\sqrt{A} = B$ může mít řešení jen pro $B \ge 0$ a $A \ge 0$. Někdy tyto dvě podmínky samy o sobě pustí jediného kandidáta a umocnění pak slouží jen jako kontrola.

> [!POZOR] Zkouška je u iracionálních rovnic povinná, ne dobrovolná. Falešné kořeny z umocnění vypadají stejně nevinně jako správné — poznáš je jen dosazením.

## Exponenciální rovnice

Neznámá je v exponentu. Tři nástroje podle tvaru rovnice:

1. Stejný základ: $a^x = a^y$ (pro $a > 0$, $a$ ≠ $1$) platí právě když $x = y$. Obě strany nejdřív přepiš na stejný základ.
2. Vytýkání: $2^{x+1}$ je $2\cdot 2^x$, takže součet $2^{x+1}+2^x$ je $3\cdot 2^x$. Rozepiš mocniny se součtem v exponentu a společnou mocninu vytkni.
3. Substituce $t = a^x$: rovnice typu $4^x-3\cdot 2^x+2 = 0$ je po přepisu $4^x = (2^x)^2$ kvadratická pro $t$.

> [!VETA] Mocnina kladného základu je vždy kladná. Proto substituce $t = a^x$ vyžaduje $t > 0$: každé $t \le 0$ se zahazuje bez náhrady a každé kladné $t$ se ještě převádí zpět na $x$.

> [!POZOR] Sčítat exponenty smíš jen při násobení mocnin ($2^x\cdot 2 = 2^{x+1}$). Součet $2^{x+1}+2^x$ se nekrátí na $2^{2x+1}$ — vytkni $2^x$ a dostaneš $3\cdot 2^x$.

## Logaritmické rovnice

> [!VETA] Pravidla logaritmů (základ $a > 0$, $a$ ≠ $1$; argumenty kladné):
>
> $$
> \log_a (xy) = \log_a x + \log_a y \qquad \log_a \dfrac{x}{y} = \log_a x - \log_a y
> $$
>
> $$
> \log_a x^r = r\log_a x \qquad a^{\log_a x} = x
> $$

Postup: nejdřív podmínky (každý argument logaritmu je kladný), pak sloučení logaritmů pravidly na jeden, pak odlogaritmování ($\log_a A = \log_a B$ právě když $A = B$ na společném definičním oboru). Rovnice s $\log_a x$ ve vyšších mocninách řeš substitucí $t = \log_a x$.

> [!POZOR] Podmínky se píšou z původního tvaru rovnice. Součin $(x+1)(x-1)$ je kladný i pro $x = -3$, ale původní logaritmy $\log_2(x+1)$ a $\log_2(x-1)$ tam definované nejsou — $x = -3$ se musí vyřadit.

## Goniometrické rovnice v kostce

Podrobný výklad je v jednotce Goniometrie; zde jen to, co potřebuješ jako řešitel rovnic. Základní rovnice (pro $a$ v oboru hodnot dané funkce):

- $\sin x = a$: dvě větve ($x = \alpha+2k\pi$ nebo $x = \pi-\alpha+2k\pi$),
- $\cos x = a$: dvě větve ($x = \pm\alpha+2k\pi$),
- $\tan x = a$: jediná rodina s periodou $\pi$ ($x = \alpha+k\pi$).

Složitější rovnice převáděj na tyto základní: substitucí ($t = \sin x$, pak zahodit $t$ mimo $\langle -1, 1\rangle$), vytýkáním místo dělení (nikdy neděl výrazem s neznámou), a kondenzací součtu $a\sin x+b\cos x$ na jedinou funkci:

$$
a\sin x + b\cos x = \sqrt{a^2+b^2}\sin(x+\varphi)
$$

pro vhodný posun $\varphi$.

> [!POZOR] U rovnosti sinů nezapomeň druhou větev: $\sin A = \sin B$ znamená $A = B+2k\pi$ nebo $A = \pi-B+2k\pi$. Kdo použije jen první větev, ztratí polovinu řešení.

## Nerovnice

Lineární nerovnice se řeší stejnými úpravami jako rovnice s jedním rozdílem navíc:

> [!VETA] Násobení a dělení obou stran nerovnice záporným číslem otáčí znaménko nerovnosti. Násobení a dělení kladným číslem ho nechává.

Kvadratické nerovnice řeš přes nulové body a tvar paraboly: parabola otevřená nahoru je záporná mezi kořeny a kladná vně (u paraboly otevřené dolů naopak). Ostrá nerovnost ($<$, $>$) znamená otevřené kraje, neostrá ($\le$, $\ge$) uzavřené.

Podílové a součinové nerovnice řeš znaménkovou tabulkou: najdi nulové body čitatele i jmenovatele, rozděl osu na intervaly a v každém urči znaménko. Nulové body jmenovatele nepatří do řešení nikdy, ani u neostré nerovnosti.

U exponenciálních a logaritmických nerovnic rozhoduje monotonie základu: pro $a > 1$ se směr nerovnosti zachovává, pro $a < 1$ se otáčí:

$$
2^x < 8 \;\Rightarrow\; x < 3 \qquad \left(\frac{1}{2}\right)^x < 8 \;\Rightarrow\; x > -3
$$

> [!POZOR] Nerovnici nikdy nenásob jmenovatelem, jehož znaménko neznáš. Zlomek $(x-1)/(x+3)$ se proti nule neporovnává „vynásobením závorkou", ale znaménkovou tabulkou — a bod $x = -3$ nepatří do řešení, i když je nerovnice neostrá.

## Typové úlohy SCIO k rovnicím

- **Ekvivalentní vs. neekvivalentní úpravy.** Poznat úpravu, která mění množinu řešení (násobení nulou, dělení výrazem s neznámou). Nástroj: seznam ekvivalentních úprav zpaměti.
- **Soustavy a slovní úlohy.** Sestavit rovnice z textu a dopočítat přesně to, na co se ptají. Nástroj: sčítací metoda + kontrola otázky.
- **Vieta naruby.** Podmínka o kořenech (poměr, rozdíl, jeden větší o 1) místo přímého řešení. Nástroj: označit kořeny a použít jejich součet a součin.
- **Parametr se změnou typu.** Hodnota parametru, která z kvadratické rovnice udělá lineární. Nástroj: zlomové hodnoty vyšetřit vždy zvlášť.
- **Umocnění a falešné kořeny.** Iracionální rovnice, kde umocněná rovnice dá kořen navíc. Nástroj: podmínky + povinná zkouška.
- **Substituce s návratem.** Exponenciální, logaritmické a bikvadratické rovnice, kde se $t$ musí převést zpět na $x$. Nástroj: každé $t$ zvlášť, záporná a nulová zahodit.
- **Podmínky z původního tvaru.** Logaritmy, odmocniny a zlomky, kde upravený tvar vypadá nevinně, ale původní má užší definiční obor. Nástroj: podmínky psát vždy před úpravami.
- **Znaménkové pasti u nerovnic.** Otáčení u záporného dělitele a u základu menšího než 1, otevřené vs. uzavřené kraje, body mimo definiční obor. Nástroj: znaménková tabulka + kontrola krajů.

## Řešené příklady

### Příklad 1

**Zadání:** Řešte $2(x-1)-(x+3)/2 = 4$.

**Řešení:**

1. Zlomku se zbavíme vynásobením dvěma (volíme nejmenší společný jmenovatel, aby zlomek zmizel):

   $$
   4(x-1) - (x+3) = 8
   $$

2. Roznásobíme — pozor na minus před závorkou:

   $$
   4x - 4 - x - 3 = 8
   $$

3. $3x = 15$, tedy $x = 5$. Zkouška: $2\cdot 4-8/2 = 8-4 = 4$. ✓

### Příklad 2

**Zadání:** Jeden kořen rovnice $x^2-5x+m = 0$ je o $1$ větší než druhý. Určete $m$.

**Řešení:**

1. Označme kořeny $r$ a $r+1$. Součet z Viety: $r+(r+1) = 5$, tedy $r = 2$ a druhý kořen je $3$.
2. Součin z Viety je $m$: $m = 2\cdot 3 = 6$.
3. Kontrola: rovnice $x^2-5x+6 = 0$ má kořeny $2$ a $3$, jejich rozdíl je $1$. ✓ (Volba Viety místo diskriminantu: podmínka je o vztahu kořenů, ne o jejich existenci.)

### Příklad 3

**Zadání:** Řešte $\sqrt{2x+1} = x-1$.

**Řešení:**

1. Podmínky: $2x+1 \ge 0$ a $x-1 \ge 0$, tedy $x \ge 1$. (Z druhé plyne i první: $x \ge 1$ dává $2x+1 \ge 3$.)
2. Obě strany nezáporné, smíme umocnit:

   $$
   2x + 1 = x^2 - 2x + 1
   $$

   $$
   x^2 - 4x = 0
   $$

3. $x(x-4) = 0$: kandidáti $x = 0$ a $x = 4$. Podmínce $x \ge 1$ vyhoví jen $x = 4$; zkouška: $\sqrt{9} = 3 = 4-1$. ✓

### Příklad 4

**Zadání:** Řešte $2^{2x}-5\cdot 2^x+4 = 0$.

**Řešení:**

1. Protože $2^{2x} = (2^x)^2$, volíme substituci $t = 2^x$ (rozpoznání skrytého čtverce je celý trik):

   $$
   t^2 - 5t + 4 = 0
   $$

2. $t = 1$ nebo $t = 4$. Obě hodnoty jsou kladné, takže obě postupují dál.
3. Návrat k $x$: $2^x = 1$ dává $x = 0$; $2^x = 4$ dává $x = 2$. ✓

### Příklad 5

**Zadání:** Pro která $k$ má rovnice $x^2-kx+4 = 0$ oba kořeny záporné?

**Řešení:**

1. Tři podmínky: $D > 0$ (dva různé reálné kořeny), součet $k$ záporný, součin $4$ kladný (ten platí vždy).
2. $D = k^2-16 > 0$ dává $k < -4$ nebo $k > 4$; součet kořenů je $k$, takže $k < 0$. (Volba postupu: znaménka kořenů se čtou z Viety, existence z diskriminantu.)
3. Průnik: $k < -4$. ✓

### Příklad 6

**Zadání:** Řešte $(x+2)/(x-1) \le 0$.

**Řešení:**

1. Nulový bod čitatele $x = -2$; jmenovatel nesmí být nula: $x$ ≠ $1$. (Násobení závorkou $(x-1)$ je zakázané — její znaménko neznáme.)
2. Znaménka po intervalech: pro $x < -2$ je zlomek kladný, pro $-2 < x < 1$ záporný, pro $x > 1$ kladný.
3. Vyhoví záporný interval; bod $x = -2$ patří (neostrá nerovnost), bod $x = 1$ nikdy:

   $$
   x \in \langle -2;\, 1)
   $$

## Shrnutí vzorců

- $D = b^2-4ac$
- $x = (-b\pm\sqrt{D})/(2a)$
- $x_1+x_2 = -b/a$, $x_1 x_2 = c/a$ (pro $a = 1$: $-b$ a $c$)
- Stejný základ: $a^x = a^y$ ($a > 0$, $a$ ≠ $1$) platí právě když $x = y$.
- Odlogaritmování: $\log_a A = \log_a B$ právě když $A = B$ (na definičním oboru).
- $\log_a(xy) = \log_a x+\log_a y$
- $\log_a(x/y) = \log_a x-\log_a y$
- $\sqrt{A} = B$ vyžaduje $A \ge 0$ a $B \ge 0$.
- Substituce: $t = x^2$ ($t \ge 0$), $t = a^x$ ($t > 0$), $t = \log_a x$.
- Nerovnice: dělení záporným číslem otáčí; základ $a < 1$ otáčí u mocnin i logaritmů.
- $\sin A = \sin B$: $A = B+2k\pi$ nebo $A = \pi-B+2k\pi$.
- Kvadratický vzorec v display podobě:

  $$
  x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
  $$
