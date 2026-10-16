# Posloupnosti a řady

Posloupnost je seznam čísel očíslovaných pořadím: první člen, druhý člen a tak dále. Ve SCIO se posloupnosti objevují ve čtyřech podobách: aritmetické a geometrické posloupnosti (vzorec pro n-tý člen a součet), limity (kam posloupnost míří), nekonečné řady (součet donekonečna) a finanční matematika (úročení je geometrická posloupnost v převleku).

## Co je posloupnost

Posloupnost zapisujeme jako $a_1, a_2, a_3, \ldots$ a n-tý člen značíme $a_n$. Zadání je buď vzorcem pro n-tý člen (například $a_n = 2n + 1$), nebo rekurentně: prvním členem a pravidlem pro další (například $a_1 = 2$, $a_{n+1} = 2a_n$).

Graf posloupnosti tvoří izolované body: na vodorovnou osu se vynáší pořadí $n$, na svislou hodnota $a_n$. I když předpis vypadá jako funkce, definičním oborem jsou jen přirozená čísla.

## Aritmetická posloupnost

Aritmetická posloupnost roste stále o stejný krok. Rozdíl každých dvou sousedních členů je konstanta $d$, které říkáme diference.

> [!VETA] N-tý člen aritmetické posloupnosti ($d$ je diference):
>
> $$
> a_n = a_1 + (n-1)d
> $$

Proč to funguje: od $a_1$ k $a_n$ vede $n - 1$ kroků, každý velikosti $d$.

> [!VETA] Součet prvních $n$ členů (průměr krajních krát počet):
>
> $$
> s_n = \frac{n}{2}(a_1 + a_n)
> $$

Proč to funguje: sečti posloupnost s její obrácenou kopií — každá dvojice dá $a_1 + a_n$, dvojic je $n$ a výsledek děl dvěma.

Tři čísla $a, b, c$ v tomto pořadí tvoří aritmetickou posloupnost právě když $b$ je průměr krajních:

$$
b = \frac{a+c}{2}
$$

> [!POZOR] Počet kroků mezi $a_k$ a $a_m$ je $m - k$, ne $m - k + 1$. Mezi $a_5$ a $a_{11}$ je 6 diferencí: $a_{11} - a_5 = 6d$.

Slovní úlohy typu vložte mezi čísla: vložením $k$ čísel mezi dva krajní vznikne $k + 2$ členů, tedy $k + 1$ kroků. Diference je rozdíl krajních dělený počtem kroků.

## Geometrická posloupnost

Geometrická posloupnost se stále násobí stejným číslem. Podíl každých dvou sousedních členů je konstanta $q$, které říkáme kvocient.

> [!VETA] N-tý člen geometrické posloupnosti ($q$ je kvocient):
>
> $$
> a_n = a_1 q^{n-1}
> $$

> [!VETA] Součet prvních $n$ členů, pro $q$ ≠ 1:
>
> $$
> s_n = a_1\frac{q^n-1}{q-1}
> $$

Pro $q = 1$ jsou všechny členy stejné a $s_n = n a_1$.

Tři čísla $a, b, c$ v tomto pořadí tvoří geometrickou posloupnost právě když:

$$
b^2 = ac
$$

Prostřední člen je tedy geometrickým průměrem krajních (až na znaménko).

Chování podle kvocientu (pro kladné $a_1$): $q > 1$ roste nade všechny meze, $q = 1$ je konstantní, $0 < q < 1$ klesá k nule, $q = 0$ je od druhého členu nulová, $q < 0$ střídá znaménka.

> [!POZOR] Mezi $a_k$ a $a_m$ je $m - k$ kroků, takže $a_m/a_k = q^{m-k}$ a kvocient se hledá odmocninou, ne dělením: $q = \sqrt[m-k]{a_m/a_k}$.

Srovnání obou typů:

| Vlastnost | Aritmetická | Geometrická |
|---|---|---|
| Krok | $+d$ | $\cdot q$ |
| N-tý člen | $a_1+(n-1)d$ | $a_1q^{n-1}$ |
| Součet | $n(a_1+a_n)/2$ | $a_1(q^n-1)/(q-1)$ |

## Monotonie a omezenost

Posloupnost je rostoucí, když je každý další člen větší než předchozí; klesající, když je menší. Ověří se znaménkem rozdílu $a_{n+1} - a_n$: kladný znamená růst, záporný pokles.

Některé posloupnosti monotonii nemají: $(-1)^n$ střídá znaménka, takže není ani rostoucí, ani klesající.

Posloupnost je omezená, když se všechny její členy vejdou do nějakého konečného intervalu. Například $1/n$ je omezená (všechny členy leží mezi 0 a 1), zatímco $2^n$ shora omezená není.

> [!POZOR] Ohraničenost není totéž co konvergence: $(-1)^n$ je omezená, ale nemá limitu. A neohraničená ještě neznamená limitu $+\infty$: $(-1)^n n$ míří sudými a lichými členy opačným směrem.

## Limita posloupnosti

Limita říká, kam se členy posloupnosti hromadí, když $n$ roste nade všechny meze. Zápis $\lim a_n = L$ znamená: členy jsou od určitého pořadí libovolně blízko číslu $L$.

Konvergentní posloupnost má vlastní (konečnou) limitu; divergentní má limitu $+\infty$, $-\infty$, nebo nemá limitu vůbec.

Základní limity, ze kterých se skládá vše ostatní: $1/n$ míří k 0, $n^k$ pro kladné $k$ míří k $+\infty$, $q^n$ pro $|q| < 1$ míří k 0 a pro $q > 1$ míří k $+\infty$.

> [!VETA] Podíl polynomů: rozhodují nejvyšší mocniny. Vytkni z čitatele i jmenovatele nejvyšší mocninu $n$ a zkrať:
>
> $$
> \lim_{n\to\infty}\frac{3n^2+2n-1}{5n^2-n+4} = \frac{3}{5}
> $$

Pravidlo ve zkratce: stejné stupně — podíl vedoucích koeficientů; vyšší stupeň dole — limita 0; vyšší stupeň nahoře — limita $+\infty$ nebo $-\infty$ podle znaménka.

Triky pro ostatní typy:

- Odmocnina minus polynom (typ $\infty - \infty$): rozšiř sdruženým výrazem. Například $\sqrt{n^2+3n}-n$ se rozšířením změní na zlomek s limitou $3/2$.
- Exponenciály: vyděl nejsilnějším členem (největším základem). Zlomky typu $(2/3)^n$ míří k nule:

$$
\frac{2\cdot 3^n-5}{3^n+2^n} = \frac{2-5/3^n}{1+(2/3)^n} \to 2
$$

- Součet $1 + 2 + \ldots + n$ nejdřív sečti vzorcem pro aritmetickou posloupnost a pak teprve počítej limitu:

$$
\frac{n(n+1)}{2n^2} \to \frac{1}{2}
$$

> [!POZOR] Zápis $\infty - \infty$ ani $\infty/\infty$ není výsledek, ale výzva k úpravě. Tipovat 0 nebo $\infty$ bez úpravy je chyba — po úpravě může vyjít libovolné číslo.

## Nekonečná geometrická řada

Nekonečná řada je součet všech členů posloupnosti: $a_1 + a_2 + \ldots$. U geometrické posloupnosti tento součet existuje (řada konverguje), jen když se členy zmenšují dost rychle.

> [!VETA] Součet nekonečné geometrické řady existuje právě pro $|q| < 1$ a platí:
>
> $$
> s = \frac{a_1}{1-q}
> $$

Proč to funguje: součet prvních $n$ členů je $a_1(q^n-1)/(q-1)$; pro $|q| < 1$ člen $q^n$ mizí k nule a po úpravě zbude $a_1/(1-q)$.

Periodická desetinná čísla jsou geometrické řady v převleku: $0{,}\overline{27} = 27/100 + 27/100^2 + \ldots$. Prakticky se převádějí rovnicí: $x = 0{,}\overline{27}$, pak $100x = 27{,}\overline{27}$, odečtením $99x = 27$, tedy $x = 27/99 = 3/11$.

> [!POZOR] Vzorec $s = a_1/(1-q)$ platí jen pro $|q| < 1$. Pro $q$ mimo tento obor řada diverguje a dosazení do vzorce dá nesmysl — podmínku ověř vždy jako první.

Slovní úlohy (míč, útlum): napiš si prvních pár členů a rozhodni, které se počítají jednou a které dvakrát. První pád míče nemá svůj výskok nazpět — zdvojuje se až od prvního odrazu.

## Finanční matematika

Finanční matematika je geometrická posloupnost s procenty. Základní pojmy: jistina (vložená částka), úroková míra $p$ (například 5 % p.a. — per annum, ročně) a úrokovací období.

> [!VETA] Jednoduché úročení (úrok se neúročí): po $n$ letech je z jistiny $J_0$ částka:
>
> $$
> J_n = J_0(1 + np)
> $$
>
> kde $p$ je míra desetinným číslem (5 % znamená $p = 0{,}05$).

> [!VETA] Složené úročení (úročí se i úroky): po $n$ letech:
>
> $$
> J_n = J_0(1+p)^n
> $$

To je geometrická posloupnost s kvocientem $q = 1 + p$.

Rozdíl poznáš podle otázky: jednoduché úročení roste lineárně (stále stejný přírůstek), složené geometricky (přírůstek roste). Pro jediný rok se oba způsoby shodují.

Pravidelné vklady (střádání): každý vklad se úročí jinou dobu. Vkladům na konci každého roku po 3 roky při míře $p$ odpovídá součet:

$$
J_0(1+p)^2 + J_0(1+p) + J_0
$$

což je geometrická posloupnost — sečti ji vzorcem pro $s_n$.

> [!POZOR] U střádání si pohlídej, kolik let se který vklad úročí: poslední vklad uložený na konci spoření se neúročí vůbec (násobí se jedničkou). Posunutí všech exponentů o jedna je nejčastější chyba.

## Typové úlohy SCIO k posloupnostem

- **N-tý člen a určení posloupnosti.** Dosazení do $a_1+(n-1)d$ nebo $a_1q^{n-1}$; u dvou zadaných členů vede cesta přes počet kroků (u AP dělení, u GP odmocnina).
- **Vkládání čísel.** Počet kroků je o jeden větší než počet vložených čísel. Nástroj: diference či kvocient z krajních členů.
- **Součet a rovnice pro n.** Vzorec pro $s_n$ dá rovnici (u AP kvadratickou) — záporný kořen škrtni. Nástroj: zkouška dosazením.
- **Trojice s podmínkou.** AP: prostřední je průměr; GP: $b^2 = ac$. Nástroj: soustava dvou rovnic.
- **Poznej typ podle předpisu.** AP má konstantní diferenci, GP konstantní podíl. Nástroj: $a_{n+1}-a_n$ a $a_{n+1}/a_n$.
- **Limita podílu.** Stejné stupně vedou na podíl koeficientů, jinak 0 nebo nekonečno. Nástroj: vytknout nejsilnější člen.
- **Limita s odmocninou.** Typ $\infty-\infty$. Nástroj: rozšířit sdruženým výrazem.
- **Limita s exponenciálami.** Nástroj: vydělit nejsilnějším základem na n-tou.
- **Nekonečná řada.** Jen pro $|q|<1$: $s=a_1/(1-q)$. Nástroj: nejdřív najdi $q$ a $a_1$, pak teprve sčítej.
- **Periodické číslo.** Nástroj: rovnice $10^kx-x$ podle délky periody $k$.

## Řešené příklady

### Příklad 1

**Zadání:** V aritmetické posloupnosti je $a_3 = 7$ a $a_7 = 19$. Urči diferenci a první člen.

**Řešení:**

1. Mezi členy jsou $7 - 3 = 4$ kroky, takže $4d = 19 - 7 = 12$ a $d = 3$.
2. První člen je o 2 kroky před $a_3$:

   $$
   a_1 = 7 - 2\cdot 3 = 1
   $$

3. Zkouška: $1, 4, 7, 10, 13, 16, 19$ — sedmý člen je 19.

### Příklad 2

**Zadání:** Urči limitu posloupnosti $a_n = \sqrt{n^2+3n}-n$.

**Řešení:**

1. Přímé dosazení dá neurčitý výraz $\infty-\infty$ — rozšíříme sdruženým výrazem:

   $$
   a_n = \frac{3n}{\sqrt{n^2+3n}+n}
   $$

2. Vydělíme čitatele i jmenovatele $n$:

   $$
   a_n = \frac{3}{\sqrt{1+3/n}+1} \to \frac{3}{2}
   $$

3. Člen $3/n$ mizí k nule, takže limita je $3/2$. Tipovat 0 bez úpravy by byla chyba.

### Příklad 3

**Zadání:** Sečti nekonečnou řadu $12 + 4 + 4/3 + \ldots$.

**Řešení:**

1. Kvocient: $q = 4/12 = 1/3$. Podmínka $|q|<1$ platí, řada konverguje.
2. Dosadíme do vzorce:

   $$
   s = \frac{12}{1-1/3} = 18
   $$

### Příklad 4

**Zadání:** Na konci každého roku ukládáš 2000 Kč při úroku 10 % p.a. Kolik budeš mít po 3 vkladech?

**Řešení:**

1. Vklady se úročí 2, 1 a 0 let — jde o geometrickou posloupnost s $q = 1{,}1$:

   $$
   2000\cdot 1{,}1^2 + 2000\cdot 1{,}1 + 2000
   $$

2. Vytkneme 2000 a sečteme:

   $$
   2000\cdot(1{,}21 + 1{,}1 + 1) = 6620
   $$

3. Odpověď: 6620 Kč. Bez úroků by to bylo 6000 Kč, jednoduché úročení by dalo 6600 Kč.

## Shrnutí vzorců

- $a_n = a_1+(n-1)d$ (aritmetická, $d$ je diference)
- $s_n = n(a_1+a_n)/2$ (součet AP)
- $a_n = a_1q^{n-1}$ (geometrická, $q$ je kvocient)
- Součet prvních $n$ členů GP (pro kvocient různý od 1):

  $$
  s_n = a_1\frac{q^n-1}{q-1}
  $$

- $b^2 = ac$ (tři členy GP za sebou)
- $b = (a+c)/2$ (tři členy AP za sebou)
- $s = a_1/(1-q)$ (nekonečná řada, jen pro $|q|<1$)
- $J_n = J_0(1+np)$ (jednoduché úročení)
- $J_n = J_0(1+p)^n$ (složené úročení)
