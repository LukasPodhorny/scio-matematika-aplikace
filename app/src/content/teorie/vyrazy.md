# Algebraické výrazy

Algebraické výrazy jsou jazyk, ve kterém se píše skoro každá úloha testu: roznásobování závorek, vzorce pro druhé mocniny, krácení zlomků, mocniny, odmocniny a absolutní hodnota. Cílem úprav je získat přehlednější zápis se stejnou hodnotou pro všechny přípustné hodnoty proměnných.

## Výraz, proměnná a mnohočlen

Proměnná zastupuje číslo. **Výraz** například $3x+2$ předepisuje výpočet, zatímco **rovnice** $3x+2=14$ požaduje najít hodnoty, pro které platí rovnost. **Definiční obor** obsahuje všechny hodnoty, při nichž mají všechny operace ve výrazu smysl.

Mnohočlen v jedné proměnné je součet členů s nezápornými celočíselnými exponenty. Čísla násobící jednotlivé mocniny jsou **koeficienty**, člen bez proměnné je **absolutní člen**. Například:

$$
P(x)=3x^4-2x^2+7
$$

Koeficienty od čtvrté mocniny po nultou jsou $3,0,-2,0,7$. Chybějící mocnina má koeficient nula. Stupeň tohoto mnohočlenu je 4: nejvyšší exponent s nenulovým koeficientem **po sečtení podobných členů**. Nenulový konstantní mnohočlen má stupeň 0; nulovému zde stupeň nepřiřazujeme.

Výrazy $1/x$, $\sqrt{x}$ a $x^{-2}+1$ nejsou mnohočleny v proměnné $x$. Naproti tomu $\sqrt{2}x^3$ mnohočlen je: koeficient smí být iracionální číslo.

### Převod slovního zadání na výraz

Nejdřív napiš význam proměnné a pak překládej jednotlivé vztahy:

- „o 5 více než $t$“ znamená $t+5$;
- „trojnásobek $t$“ znamená $3t$;
- „o 5 méně než dvojnásobek $t$“ znamená $2t-5$;
- „dvojnásobek čísla zmenšeného o 5“ znamená $2(t-5)$.

U věku vždy porovnávej osoby **ve stejném okamžiku**. Má-li Eva nyní $t$ let a za dva roky bude mít její trenér trojnásobek jejího tehdejšího věku, trenér bude mít $3(t+2)$ let. Dnes tedy má $3(t+2)-2$ let. U vztahu z minulosti postupuj opačně: nejdřív odečti posun, sestav tehdejší vztah a nakonec přičti čas zpět.

> [!POZOR] Rozlišuj „o kolik“ (rozdíl) a „kolikrát“ (poměr). Věk nemůže být záporný a v minulosti musí daná osoba už existovat; proměnná ve slovní úloze proto nemusí smět nabývat všech reálných hodnot.

## Roznásobování a vytýkání

Sčítáme jen podobné členy: $3x^2-5x^2=-2x^2$, ale $3x^2+5x$ už takto sloučit nejde. Při násobení naopak exponenty stejného základu sčítáme: $3x^2\cdot5x=15x^3$.


Součin závorek: každý člen s každým.

$$
(a + b)(c + d) = ac + ad + bc + bd
$$

Vytýkání je opačný směr: $4x^2 + 6x$ se rovná $2x(2x + 3)$. Obvykle volíme největší společný činitel všech členů — číslo i proměnné. Vytknout lze i menší společný činitel, ale rozklad pak nemusí být dokončený. Kontrola: závorku roznásob zpět.

> [!POZOR] Minus před závorkou mění znaménko každého členu: $a - (b - c)$ se rovná $a - b + c$.

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

> [!POZOR] $(a + b)^2$ není $a^2 + b^2$. Nezapomeň na smíšený člen $2ab$.

Vzorce čti oběma směry: zleva doprava rozvíjíš, zprava doleva rozkládáš. Rozklad $9x^2 - 25$ na $(3x - 5)(3x + 5)$ je třetí vzorec s $a = 3x$.

Užitečná odvozenina: $(a - b)^2 + 2ab$ se rovná $a^2 + b^2$. Znáš-li $a - b$ a $ab$, dopočítáš $a^2 + b^2$ bez řešení soustavy.

## Třetí mocniny a součet či rozdíl krychlí

Rozlišuj třetí mocninu závorky a součet třetích mocnin:

$$
(a+b)^3=a^3+3a^2b+3ab^2+b^3
$$

$$
(a-b)^3=a^3-3a^2b+3ab^2-b^3
$$

$$
a^3+b^3=(a+b)(a^2-ab+b^2)
$$

$$
a^3-b^3=(a-b)(a^2+ab+b^2)
$$

Vzorec pro třetí mocninu získáš vynásobením druhé mocniny další závorkou. U součtu a rozdílu krychlí je v první závorce původní znaménko a u smíšeného členu ve druhé opačné; poslední člen je vždy kladný.

Například $8x^3+27$ rozpoznáme jako $(2x)^3+3^3$:

$$
8x^3+27=(2x+3)(4x^2-6x+9)
$$

> [!POZOR] $(a-b)^3$ není $a^3-b^3$. V rozvoji závorky jsou navíc dva smíšené členy.

## Rozklady mnohočlenů

U jednoduchého trojčlenu $x^2+px+q$ hledáme čísla $u,v$ se součtem $p$ a součinem $q$:

$$
x^2+px+q=(x+u)(x+v)
$$

Například pro $x^2+x-12$ vyhoví $u=4$, $v=-3$. Ne každá dvojice koeficientů umožní rozklad na celočíselné činitele; když hledání nevychází, pomůže výpočet kořenů. Bez reálných kořenů nelze kvadratický mnohočlen rozložit na reálné lineární činitele.


U trojčlenu $2x^2 + 7x + 3$ hledej tvar $(2x + a)(x + b)$: součin $ab$ musí být $3$ a součet $2b + a$ musí být $7$. Dvojice $a = 1$, $b = 3$ vyhovuje, rozklad je $(2x + 1)(x + 3)$. Vždy roznásob zpět a zkontroluj prostřední člen.

Obecně: má-li $x^2 + px + q$ kořeny $r$ a $s$, pak se rovná $(x - r)(x - s)$.

U kubického mnohočlenu s celočíselnými koeficienty můžeš hledat celočíselný kořen mezi kladnými i zápornými děliteli nenulového absolutního členu. Takový kořen ale nemusí existovat. Pokud jej najdeš, vyděl příslušným lineárním činitelem a rozlož zbývající kvadratický mnohočlen. U $x^3 - 2x^2 - 5x + 6$ je kořenem $x = 1$, po vydělení $(x - 1)(x^2 - x - 6)$ a dál $(x - 1)(x - 3)(x + 2)$.

> [!POZOR] Znaménka v činitelích: kořen $r = 3$ dává činitele $(x - 3)$, ne $(x + 3)$.

Rozklad umí i dělitelnost: $n^3 - n$ se rovná $n(n - 1)(n + 1)$, což jsou tři po sobě jdoucí čísla. Jedno z nich je vždy dělitelné třemi, takže výraz je dělitelný třemi pro každé celé $n$.

## Rovnost mnohočlenů a porovnávání koeficientů

Dva mnohočleny jsou totožné, pokud mají po úpravě stejné koeficienty u všech mocnin proměnné. Nestačí, že dávají stejnou hodnotu pro jedno konkrétní $x$.

Například požadujeme-li pro všechna reálná $x$ rovnost

$$
2x^2+cx+d=(x+3)(ax-4),
$$

pravou stranu roznásobíme:

$$
(x+3)(ax-4)=ax^2+(3a-4)x-12.
$$

Porovnáním dostaneme $a=2$, $c=3a-4=2$ a $d=-12$. Kdyby na levé straně člen s $x$ chyběl, musel by jeho koeficient napravo být nula.

> [!POZOR] V identitě „pro všechna $x$“ hledáš koeficienty, nikoli jedno řešení $x$. Dosazení vhodných hodnot, například 0 nebo kořene některé závorky, pomáhá určit kandidáty; jejich správnost ověř roznásobením.

## Dělení mnohočlenů a Viètovy vztahy

### Dělení jednočlenem a mnohočlenem

Při dělení jednočlenem vyděl **každý člen** čitatele. Pro $x$ ≠ 0:

$$
\frac{6x^3-9x^2+12}{3x}=2x^2-3x+\frac4x
$$

Při dělení mnohočlenem nejdřív seřaď členy od nejvyšší mocniny; chybějící mocniny si doplň s nulovým koeficientem. Opakuj tři kroky: vyděl vedoucí členy, vynásob tím celý dělitel, výsledek odečti. Končíš, když je zbytek nulový nebo má nižší stupeň než dělitel.

**Ukázka:** vydělíme $2x^3+3x^2+0x+4$ výrazem $x^2+1$.

1. Vedoucí členy dávají $2x^3/x^2=2x$. Odečteme $2x(x^2+1)$ a zbude $3x^2-2x+4$.
2. Nyní $3x^2/x^2=3$. Odečteme $3(x^2+1)$ a zbude $-2x+1$.
3. Zbytek má stupeň 1, dělitel 2. Výsledkem je:

$$
\frac{2x^3+3x^2+4}{x^2+1}
=2x+3+\frac{-2x+1}{x^2+1}
$$

Obecně platí $P=DQ+R$, kde $Q$ je podíl a $R$ zbytek. Tímto vztahem dělení zkontroluj. Pro zápis $P/D$ musí být $D(x)$ ≠ 0; v ukázce je $x^2+1$ kladné pro všechna reálná $x$.

### Zbytek, Hornerovo schéma a vztahy mezi kořeny

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

U samotného podílu dvou mnohočlenů čitatel o definovanosti nerozhoduje: $x = -1$ je u $(x + 1)/(x - 2)$ nulový bod, ne zakázaný bod.

> [!POZOR] Krácení definiční obor nerozšiřuje. Podíl $(x^2 - 1)/(x - 1)$ se rovná $x + 1$ všude, kde je definován — ale bod $x = 1$ zůstává vyloučen.

Krátit se smí jen činitelé, ne sčítance. Podíl $(x^2 - 9)/(x^2 + 6x + 9)$ se nejdřív rozloží na $(x - 3)(x + 3)$ lomeno $(x + 3)^2$ a pak zkrátí na $(x - 3)/(x + 3)$.

## Operace s lomenými výrazy

Sčítání: společný jmenovatel, čitatele roznásobit křížem.

$$
\frac{2}{x - 1} + \frac{3}{x + 1} = \frac{2(x + 1) + 3(x - 1)}{x^2 - 1}
$$

Výsledek je $(5x - 1)/(x^2 - 1)$, pro $x$ ≠ 1 a $x$ ≠ −1. Nestačí sečíst čitatele — každý se musí roznásobit svým křížovým činitelem.

Násobení: čitatel s čitatelem, jmenovatel s jmenovatelem. Krátit křížem se vyplatí ještě před roznásobením.

Dělení: převrátit dělitele a násobit. Oba původní zlomky musí existovat a dělitel navíc nesmí být nula. Proto kontrolujeme také jeho čitatel. Například:

$$
\frac{x}{x-4}:\frac{x+2}{x-1}
=\frac{x(x-1)}{(x-4)(x+2)}
$$

Z původních jmenovatelů vyloučíme 4 a 1; z nulového dělitele navíc −2. Všechny tři zákazy zůstávají i po úpravě.

Složený zlomek se zjednodušuje od nejvnitřnějšího patra ven: $1 + 1/x$ se rovná $(x + 1)/x$, pak převrátit a přičíst.

> [!POZOR] Podíl $1/(1 + 1/x)$ není $1 + x$. Převrací se celý jmenovatel $(x + 1)/x$ najednou, ne člen po členu.

Rovnice s neznámou ve jmenovateli: vyřeš běžným postupem, pak každý kořen porovnej s podmínkami. Kořen padnoucí na zakázaný bod se škrtá.

## Mocniny

> [!VETA] Pro celočíselné exponenty platí následující pravidla všude, kde jsou výrazy definované. Dělení vyžaduje nenulový jmenovatel; nultá či záporná mocnina nenulový základ:
>
> $$
> a^m \cdot a^n = a^{m+n} \qquad \frac{a^m}{a^n} = a^{m-n} \qquad (a^m)^n = a^{mn}
> $$

Také $(a/b)^n=a^n/b^n$ pro $b$ ≠ 0 a přípustný základ i exponent.

Dále: $a^{-n}$ se rovná $1/a^n$ a $(ab)^n$ se rovná $a^nb^n$. Pro $a$ ≠ $0$ je $a^0$ rovno $1$.

Vnější exponent působí na každý činitel uvnitř: $(3x^{-2}y^3)^{-1}$ se rovná $3^{-1}x^2y^{-3}$, tedy $x^2/(3y^3)$. Původní výraz vyžaduje $x$ ≠ 0 i $y$ ≠ 0, přestože po úpravě už ve jmenovateli $x$ nevidíme.

> [!POZOR] $2^3$ je $8$, ne $6$. Mocnina není násobení základu exponentem.

Pro $a>0$, celé $m$ a přirozené $n$ racionální exponent spojuje mocniny s odmocninami:

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

V reálných číslech vyžaduje sudá odmocnina nezáporný výraz pod odmocnítkem; pokud je ve jmenovateli, musí být tento výraz kladný. Lichá odmocnina existuje i ze záporných čísel, například $\sqrt[3]{-125}=-5$.

Druhá odmocnina je vždy nezáporné číslo: $\sqrt{25}$ se rovná $5$, nikdy $-5$.

Částečné odmocňování: rozlož číslo na čtverec krát zbytek. $\sqrt{72}$ se rovná $\sqrt{36 \cdot 2}$, tedy $6\sqrt{2}$.

Sčítat lze jen stejné odmocniny po vytknutí: $\sqrt{50} - \sqrt{18}$ se rovná $5\sqrt{2} - 3\sqrt{2}$, tedy $2\sqrt{2}$.

> [!POZOR] $\sqrt{a + b}$ není $\sqrt{a} + \sqrt{b}$. Odmocnina součtu se nerozpadá — ověř na číslech: $\sqrt{9 + 16}$ se rovná $5$, ale $3 + 4$ se rovná $7$.

Násobení a dělení se pod jednu odmocninu spojit smí: $\sqrt{a}\sqrt{b}$ se rovná $\sqrt{ab}$ pro $a$ i $b$ nezáporné.

U podílu odmocnin musí být navíc jmenovatel kladný.

Usměrňování: zlomek $6/(\sqrt{3} - 1)$ rozšiř sdruženým výrazem $(\sqrt{3} + 1)$. Jmenovatel dá $3 - 1$, tedy $2$, a výsledek je $3(\sqrt{3} + 1)$.

> [!VETA] Odmocnina ze čtverce je absolutní hodnota:
>
> $$
> \sqrt{a^2} = |a|
> $$

Proto je $\sqrt{(x - 3)^2}$ pro $x < 3$ rovno $3 - x$, ne $x - 3$.

### Vnořené odmocniny

Postupuj zevnitř ven. Pro kladné proměnné můžeš každou odmocninu převést na mocninu a násobit exponenty. Například pro $x>0$:

$$
\sqrt{x\sqrt{x^6}}=\sqrt{x\cdot x^3}=\sqrt{x^4}=x^2.
$$

Bez podmínky kladnosti hlídej absolutní hodnotu: $\sqrt{x^6}=|x^3|$. Obecně proto nelze jen mechanicky „zkrátit“ exponent s řádem odmocniny.

Porovnávání odmocnin: umocni na společného jmenovatele exponentů. Proti sobě $\sqrt[3]{9}$ a $\sqrt[6]{80}$: šesté mocniny jsou $81$ a $80$, větší je tedy $\sqrt[3]{9}$.

## Absolutní hodnota

> [!VETA] Absolutní hodnota měří vzdálenost od nuly: $|a|$ se rovná $a$ pro $a$ nezáporné a $-a$ pro $a$ záporné.

Příklady: $|-5|$ se rovná $5$ a $|3 - 8|$ se rovná $|-5|$, tedy $5$.

$$
|a + b| \le |a| + |b| \qquad |ab| = |a| \cdot |b|
$$

Rozbor po intervalech: nulové body rozdělí osu na intervaly a v každém urči znaménko každého výrazu pod absolutní hodnotou zvlášť. Pro $x$ v $\langle -1, 2\rangle$ je $|x - 2| + |x + 1|$ rovno $(2 - x) + (x + 1)$, tedy $3$.

Vzdálenostní význam: $|x - a|$ je vzdálenost bodu $x$ od bodu $a$. Rovnice $|x - 1| + |x + 3| = 4$ říká, že součet vzdáleností od $1$ a $-3$ je $4$ — a protože body samotné jsou od sebe $4$, vyhovuje celý interval $\langle -3, 1\rangle$, tedy nekonečně mnoho řešení.

> [!POZOR] Pro $a<b$ rovnice $|x - a| + |x - b| = b - a$ nemá dvě řešení v krajních bodech, ale celý interval mezi nimi. Krajní body jen ověříš, interval dopočítáš.

## Typové úlohy SCIO k výrazům

- **Slovní vztahy a věk.** Nejprve přelož každou veličinu zvlášť; všechny věky převeď ke stejnému okamžiku.
- **Stupeň a koeficienty.** Sečti podobné členy a doplň nuly u chybějících mocnin. V identitě porovnávej koeficienty, ne jednotlivá řešení.
- **Znaménko před závorkou.** Minus patří celé závorce. Nástroj: roznásob pomalu, pak teprve sčítej.
- **Dosazení záporného čísla.** $(-2)^2 = 4$, $-(-2) = +2$. Nástroj: závorky kolem každého dosazení.
- **Součet koeficientů.** Dosazení $x = 1$; absolutní člen je hodnota v $0$. Nástroj: neroznásobovat.
- **Rozklad na součin.** Rozdíl čtverců, kvadratický trojčlen, hádání kořene u kubického. Nástroj: zpětné roznásobení.
- **Dělení mnohočlenů.** Vedoucí členy vydělit, celý dělitel vynásobit a odečíst. Kontrola: dělitel krát podíl plus zbytek.
- **Zbytek po dělení lineárním dvojčlenem.** Hodnota v kořeni dělitele. Nástroj: pozor na znaménko $c$ u $x - c$.
- **Škrtání sčítanců.** Past: krátit $x^2$ proti $x^2$ ve součtu. Nástroj: krátit až po rozkladu.
- **Podmínky lomených výrazů.** Jmenovatele rozlož; při dělení zlomkem vyluč i nuly jeho čitatele. Nástroj: podmínky z původního tvaru.
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

1. Částečně odmocni: $\sqrt{8}$ je $2\sqrt{2}$ a $\sqrt{18}$ je $3\sqrt{2}$. Sčítat pod jednou odmocninou se nesmí. Jiná správná cesta je vydělit každý sčítanec zvlášť odmocninou ze dvou.
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
- $a^{m/n}$ se rovná $(\sqrt[n]{a})^m$ pro $a>0$, celé $m$ a přirozené $n$
- $\sqrt{a^2}$ se rovná $|a|$
- $\sqrt{ab}$ se rovná $\sqrt{a}\sqrt{b}$ pro $a$ i $b$ nezáporné
- $|a + b|$ je nejvýš $|a| + |b|$

- $a^3+b^3=(a+b)(a^2-ab+b^2)$
- $a^3-b^3=(a-b)(a^2+ab+b^2)$
- dělení mnohočlenů: $P=DQ+R$; nenulový zbytek má nižší stupeň než dělitel
