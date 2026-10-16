# Algebraické výrazy

Algebraické výrazy jsou jazyk, ve kterém se píše skoro každá úloha testu: roznásobování závorek, vzorce pro druhé mocniny, krácení zlomků, mocniny, odmocniny a absolutní hodnota. Tahle jednotka shrnuje pravidla i triky, na kterých SCIO staví — včetně pastí, kde se nejčastěji chybuje.

## Roznásobování a vytýkání

Součin závorek: každý člen s každým.

$$
(a + b)(c + d) = ac + ad + bc + bd
$$

Vytýkání je opačný směr: $4x^2 + 6x$ se rovná $2x(2x + 3)$. Vytýká se největší společný činitel všech členů — číslo i proměnné. Kontrola: závorku roznásob zpět.

> [!POZOR] Minus před závorkou mění znaménko každého členu: $a - (b - c)$ se rovná $a - b + c$. Zhruba polovina chyb v úpravách je právě tady.

Záporné číslo se dosazuje vždy v závorce. Pro $x = -2$ je $x^2$ rovno $(-2)^2$, tedy $4$, ne $-4$. Podobně $x^2 - x$ je pro $x = -2$ rovno $4 + 2$, tedy $6$.

Součet koeficientů mnohočlenu se získá dosazením $x = 1$, absolutní člen dosazením $x = 0$. Součet koeficientů $(2x - 3)^5$ je tedy $(2 - 3)^5$, což je $-1$.

## Vzorce pro druhé mocniny

> [!VETA] Základní trojice vzorců:
>
> $$
> (a + b)^2 = a^2 + 2ab + b^2
> $$
>
> $$
> (a - b)^2 = a^2 - 2ab + b^2
> $$
>
> $$
> a^2 - b^2 = (a - b)(a + b)
> $$

Proč fungují: roznásobením $(a + b)(a + b)$ dostaneš $a^2 + ab + ba + b^2$ a prostřední členy se sečtou. U třetího vzorce se prostřední členy naopak odečtou.

> [!POZOR] $(a + b)^2$ není $a^2 + b^2$. Chybějící člen $2ab$ je nejčastější chyba celé středoškolské matematiky.

Vzorce čti oběma směry: zleva doprava rozvíjíš, zprava doleva rozkládáš. Rozklad $9x^2 - 25$ na $(3x - 5)(3x + 5)$ je třetí vzorec s $a = 3x$.

Užitečná odvozenina: $(a - b)^2 + 2ab$ se rovná $a^2 + b^2$. Znáš-li $a - b$ a $ab$, dopočítáš $a^2 + b^2$ bez řešení soustavy.

## Rozklady mnohočlenů

U trojčlenu $2x^2 + 7x + 3$ hledej tvar $(2x + a)(x + b)$: součin $ab$ musí být $3$ a součet $2b + a$ musí být $7$. Dvojice $a = 1$, $b = 3$ vyhovuje, rozklad je $(2x + 1)(x + 3)$. Vždy roznásob zpět a zkontroluj prostřední člen.

Obecně: má-li $x^2 + px + q$ kořeny $r$ a $s$, pak se rovná $(x - r)(x - s)$.

Kubický mnohočlen: nejdřív uhodni jeden celočíselný kořen mezi děliteli absolutního členu, pak vyděl a rozlož kvadratický zbytek. U $x^3 - 2x^2 - 5x + 6$ je kořenem $x = 1$, po vydělení $(x - 1)(x^2 - x - 6)$ a dál $(x - 1)(x - 3)(x + 2)$.

> [!POZOR] Znaménka v činitelích: kořen $r = 3$ dává činitele $(x - 3)$, ne $(x + 3)$.

Rozklad umí i dělitelnost: $n^3 - n$ se rovná $n(n - 1)(n + 1)$, což jsou tři po sobě jdoucí čísla. Jedno z nich je vždy dělitelné třemi, takže výraz je dělitelný třemi pro každé celé $n$.

## Dělení mnohočlenů a Viètovy vztahy

> [!VETA] Zbytek po dělení mnohočlenu $P(x)$ dvojčlenem $x - c$ je hodnota $P(c)$.

Hornerovo schéma je rychlé dělení dvojčlenem $x - c$: koeficienty se postupně násobí číslem $c$ a přičítají. Poslední číslo je zbytek, ostatní jsou koeficienty podílu.

> [!POZOR] Děliteli $x - 2$ odpovídá $c = 2$, ne $-2$. Znaménko se obrací: dvojčlen $x - c$ má kořen $+c$.

> [!VETA] Viètovy vztahy pro $x^2 + px + q$ s kořeny $r$ a $s$:
>
> $$
> r + s = -p \qquad rs = q
> $$

Z nich se skládají i složitější výrazy: $1/r + 1/s$ se rovná $(r + s)/rs$. Pro kořeny rovnice $x^2 - 7x + 10$ je součet $7$ a součin $10$, takže výsledek je $7/10$.

Binomická věta dává jednotlivé členy rozvoje: člen s $x^2$ v $(x - 2)^5$ je

$$
\binom{5}{2}x^2(-2)^3 = 10 \cdot (-8) \, x^2
$$

Koeficient je tedy $-80$. Umocňuje se i číslo $-2$ včetně znaménka, a to na $5 - 2$, tedy na třetí.

## Lomené výrazy a podmínky

> [!VETA] Lomený výraz je definován právě tam, kde je jmenovatel různý od nuly. Podmínky se píšou z původního tvaru, před krácením.

Jmenovatel nejdřív rozlož: $(x - 2)(x + 3)$ je nula pro $x = 2$ a $x = -3$, takže výraz s tímto jmenovatelem je definován pro $x$ ≠ $2$ a $x$ ≠ $-3$.

Čitatel o definovanosti nerozhoduje: $x = -1$ je u $(x + 1)/(x - 2)$ nulový bod, ne zakázaný bod.

> [!POZOR] Krácení definiční obor nerozšiřuje. Podíl $(x^2 - 1)/(x - 1)$ se rovná $x + 1$ všude, kde je definován — ale bod $x = 1$ zůstává vyloučen.

Krátit se smí jen činitelé, ne sčítance. Podíl $(x^2 - 9)/(x^2 + 6x + 9)$ se nejdřív rozloží na $(x - 3)(x + 3)$ lomeno $(x + 3)^2$ a pak zkrátí na $(x - 3)/(x + 3)$.

## Operace s lomenými výrazy

Sčítání: společný jmenovatel, čitatele roznásobit křížem.

$$
\frac{2}{x - 1} + \frac{3}{x + 1} = \frac{2(x + 1) + 3(x - 1)}{x^2 - 1}
$$

Výsledek je $(5x - 1)/(x^2 - 1)$. Nestačí sečíst čitatele — každý se musí roznásobit svým křížovým činitelem.

Násobení: čitatel s čitatelem, jmenovatel s jmenovatelem. Krátit křížem se vyplatí ještě před roznásobením.

Dělení: převrátit dělitele a násobit. Podmínky přibydou i z čitatele dělitele, protože převrácením se stane jmenovatelem.

Složený zlomek se zjednodušuje od nejvnitřnějšího patra ven: $1 + 1/x$ se rovná $(x + 1)/x$, pak převrátit a přičíst.

> [!POZOR] Podíl $1/(1 + 1/x)$ není $1 + x$. Převrací se celý jmenovatel $(x + 1)/x$ najednou, ne člen po členu.

Rovnice s neznámou ve jmenovateli: vyřeš běžným postupem, pak každý kořen porovnej s podmínkami. Kořen padnoucí na zakázaný bod se škrtá.

## Mocniny

> [!VETA] Pravidla pro mocniny se stejným základem:
>
> $$
> a^m \cdot a^n = a^{m+n} \qquad \frac{a^m}{a^n} = a^{m-n} \qquad (a^m)^n = a^{mn}
> $$

Dále: $a^{-n}$ se rovná $1/a^n$ a $(ab)^n$ se rovná $a^nb^n$. Pro $a$ ≠ $0$ je $a^0$ rovno $1$.

Vnější exponent působí na každý činitel uvnitř: $(3x^{-2}y^3)^{-1}$ se rovná $3^{-1}x^2y^{-3}$, tedy $x^2/(3y^3)$.

> [!POZOR] $2^3$ je $8$, ne $6$. Mocnina není násobení základu exponentem.

Racionální exponent spojuje mocniny s odmocninami:

$$
a^{m/n} = (\sqrt[n]{a})^m
$$

Například $27^{2/3}$ se rovná $(\sqrt[3]{27})^2$, tedy $9$.

Mocniny, které se vyplatí znát zpaměti:

| Mocnina | Hodnota |
|---|---|
| $2^{10}$ | $1024$ |
| $3^4$ | $81$ |
| $5^3$ | $125$ |
| $(-2)^3$ | $-8$ |

## Odmocniny

Druhá odmocnina je vždy nezáporné číslo: $\sqrt{25}$ se rovná $5$, nikdy $-5$.

Částečné odmocňování: rozlož číslo na čtverec krát zbytek. $\sqrt{72}$ se rovná $\sqrt{36 \cdot 2}$, tedy $6\sqrt{2}$.

Sčítat lze jen stejné odmocniny po vytknutí: $\sqrt{50} - \sqrt{18}$ se rovná $5\sqrt{2} - 3\sqrt{2}$, tedy $2\sqrt{2}$.

> [!POZOR] $\sqrt{a + b}$ není $\sqrt{a} + \sqrt{b}$. Odmocnina součtu se nerozpadá — ověř na číslech: $\sqrt{9 + 16}$ se rovná $5$, ale $3 + 4$ se rovná $7$.

Násobení a dělení se pod jednu odmocninu spojit smí: $\sqrt{a}\sqrt{b}$ se rovná $\sqrt{ab}$ pro $a$ i $b$ nezáporné.

Usměrňování: zlomek $6/(\sqrt{3} - 1)$ rozšiř sdruženým výrazem $(\sqrt{3} + 1)$. Jmenovatel dá $3 - 1$, tedy $2$, a výsledek je $3(\sqrt{3} + 1)$.

> [!VETA] Odmocnina ze čtverce je absolutní hodnota:
>
> $$
> \sqrt{a^2} = |a|
> $$

Proto je $\sqrt{(x - 3)^2}$ pro $x < 3$ rovno $3 - x$, ne $x - 3$.

Porovnávání odmocnin: umocni na společného jmenovatele exponentů. Proti sobě $\sqrt[3]{9}$ a $\sqrt[6]{80}$: šesté mocniny jsou $81$ a $80$, větší je tedy $\sqrt[3]{9}$.

## Absolutní hodnota

> [!VETA] Absolutní hodnota měří vzdálenost od nuly: $|a|$ se rovná $a$ pro $a$ nezáporné a $-a$ pro $a$ záporné.

Příklady: $|-5|$ se rovná $5$ a $|3 - 8|$ se rovná $|-5|$, tedy $5$.

$$
|a + b| \le |a| + |b| \qquad |ab| = |a| \cdot |b|
$$

Rozbor po intervalech: nulové body rozdělí osu na intervaly a v každém urči znaménko každého výrazu pod absolutní hodnotou zvlášť. Pro $x$ v $\langle -1, 2\rangle$ je $|x - 2| + |x + 1|$ rovno $(2 - x) + (x + 1)$, tedy $3$.

Vzdálenostní význam: $|x - a|$ je vzdálenost bodu $x$ od bodu $a$. Rovnice $|x - 1| + |x + 3| = 4$ říká, že součet vzdáleností od $1$ a $-3$ je $4$ — a protože body samotné jsou od sebe $4$, vyhovuje celý interval $\langle -3, 1\rangle$, tedy nekonečně mnoho řešení.

> [!POZOR] Rovnice $|x - a| + |x - b| = b - a$ nemá dvě řešení v krajních bodech, ale celý interval mezi nimi. Krajní body jen ověříš, interval dopočítáš.

## Typové úlohy SCIO k výrazům

- **Znaménko před závorkou.** Minus patří celé závorce. Nástroj: roznásob pomalu, pak teprve sčítej.
- **Dosazení záporného čísla.** $(-2)^2 = 4$, $-(-2) = +2$. Nástroj: závorky kolem každého dosazení.
- **Součet koeficientů.** Dosazení $x = 1$; absolutní člen je hodnota v $0$. Nástroj: neroznásobovat.
- **Rozklad na součin.** Rozdíl čtverců, kvadratický trojčlen, hádání kořene u kubického. Nástroj: zpětné roznásobení.
- **Zbytek po dělení.** Hodnota v kořeni dělitele. Nástroj: pozor na znaménko $c$ u $x - c$.
- **Škrtání sčítanců.** Past: krátit $x^2$ proti $x^2$ ve součtu. Nástroj: krátit až po rozkladu.
- **Podmínky lomených výrazů.** Čitatel nerozhoduje, jmenovatel se rozkládá. Nástroj: podmínky z původního tvaru.
- **Složené zlomky.** Od nejvnitřnějšího patra ven. Nástroj: nikdy nepřevracet po částech.
- **Exponenty.** Sčítat při násobení, násobit při umocňování. Nástroj: $2^3$ není $2 \cdot 3$.
- **Sčítání odmocnin.** Nejprve vytknout před odmocninu. Nástroj: $\sqrt{50}$ je $5\sqrt{2}$.
- **Usměrňování.** Rozšířit sdruženým výrazem a vydělit novým jmenovatelem. Nástroj: vzorec $a^2 - b^2$.
- **Odmocnina ze čtverce.** Výsledek je $|a|$, znaménko podle podmínky. Nástroj: test $x = 0$.
- **Absolutní hodnota po intervalech.** Každá zvlášť, nulové body dělí osu. Nástroj: dosadit kraj i střed.
- **Vzdálenostní interpretace.** Součet vzdáleností rovný rozestupu bodů dá interval. Nástroj: nakreslit osu.

## Řešené příklady

### Příklad 1

**Zadání:** Zjednodušte $(x + 2)^2 - (x - 2)^2$.

**Řešení:**

1. Místo rozvíjení obou čtverců použijeme rozdíl čtverců s $A = x + 2$ a $B = x - 2$: rozdíl je $A - B = 4$ a součet je $A + B = 2x$.

   $$
   ((x + 2) - (x - 2))((x + 2) + (x - 2)) = 4 \cdot 2x = 8x
   $$

2. Kontrola rozvíjením: $(x^2 + 4x + 4) - (x^2 - 4x + 4)$ se rovná $8x$. Souhlasí.

### Příklad 2

**Zadání:** Sečtěte $1/(x - 1) - 1/(x + 1)$ a určete podmínky.

**Řešení:**

1. Společný jmenovatel je $x^2 - 1$, čitatel je $(x + 1) - (x - 1)$.
2. Pozor na minus před druhou závorkou: $(x + 1) - x + 1$ se rovná $2$.

   $$
   \frac{1}{x - 1} - \frac{1}{x + 1} = \frac{2}{x^2 - 1}
   $$

3. Podmínky z původních jmenovatelů: $x$ ≠ $1$ a $x$ ≠ $-1$.

### Příklad 3

**Zadání:** Vypočtěte $(\sqrt{8} + \sqrt{18})/\sqrt{2}$.

**Řešení:**

1. Částečně odmocni: $\sqrt{8}$ je $2\sqrt{2}$ a $\sqrt{18}$ je $3\sqrt{2}$. Sčítat pod jednou odmocninou se nesmí, vytknutí je povinný krok.
2. Součet: $2\sqrt{2} + 3\sqrt{2}$ se rovná $5\sqrt{2}$.
3. Podíl: $5\sqrt{2}/\sqrt{2}$ se rovná $5$.

### Příklad 4

**Zadání:** Řešte $|x - 1| + |x + 3| = 6$.

**Řešení:**

1. Nulové body $-3$ a $1$ dělí osu na tři intervaly. V každém odstraníme absolutní hodnoty podle znaménka.
2. Pro $x < -3$: součet je $(1 - x) + (-x - 3)$, tedy $-2x - 2$. Rovnice $-2x - 2 = 6$ dá $x = -4$, což do intervalu patří.
3. Mezi $-3$ a $1$: součet je $(1 - x) + (x + 3)$, tedy $4$. To není $6$, tady řešení není.
4. Pro $x > 1$: součet je $(x - 1) + (x + 3)$, tedy $2x + 2$. Rovnice $2x + 2 = 6$ dá $x = 2$, což vyhovuje.
5. Řešením jsou $x = -4$ a $x = 2$. Zkouška: $5 + 1 = 6$ a $1 + 5 = 6$.

## Shrnutí vzorců

- $(a + b)^2$ se rovná $a^2 + 2ab + b^2$
- $(a - b)^2$ se rovná $a^2 - 2ab + b^2$
- $a^2 - b^2$ se rovná $(a - b)(a + b)$
- Zbytek po dělení $P(x)$ dvojčlenem $x - c$ je $P(c)$
- $r + s$ se rovná $-p$ a $rs$ se rovná $q$ pro $x^2 + px + q$
- $a^m \cdot a^n$ se rovná $a^{m+n}$
- $a^m/a^n$ se rovná $a^{m-n}$
- $(a^m)^n$ se rovná $a^{mn}$
- $a^{m/n}$ se rovná $(\sqrt[n]{a})^m$
- $\sqrt{a^2}$ se rovná $|a|$
- $\sqrt{ab}$ se rovná $\sqrt{a}\sqrt{b}$ pro $a$ i $b$ nezáporné
- $|a + b|$ je nejvýš $|a| + |b|$
