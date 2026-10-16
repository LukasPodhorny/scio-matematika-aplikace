# Analytická geometrie

Analytická geometrie převádí geometrii na počítání: body mají souřadnice, přímky a roviny rovnice. Ve SCIO se objevuje v pěti podobách: vektory a jejich operace, přímka v rovině, rovina v prostoru, vzdálenosti a odchylky, a kuželosečky (hlavně kružnice).

## Body a vektory v souřadnicích

Bod v rovině zapisujeme $A = [x; y]$, v prostoru $A = [x; y; z]$. Vektor je posunutí: má směr a velikost. Vektor z bodu $A$ do bodu $B$ je rozdíl souřadnic (koncový bod minus počáteční):

$$
\overrightarrow{AB} = B - A
$$

Vektory sčítáme a násobíme číslem po složkách. Pro $u = (u_1; u_2)$ a $v = (v_1; v_2)$:

$$
u + v = (u_1 + v_1;\, u_2 + v_2) \qquad k\cdot u = (k\cdot u_1;\, k\cdot u_2)
$$

> [!VETA] Velikost vektoru (z Pythagorovy věty):
>
> $$
> |u| = \sqrt{u_1^2 + u_2^2 + u_3^2}
> $$
>
> V rovině má vektor jen dvě složky.

Střed úsečky s krajními body $[a; b]$ a $[c; d]$ je průměr souřadnic:

$$
S = \left[\frac{a+c}{2};\, \frac{b+d}{2}\right]
$$

Například střed bodů $[1; 2]$ a $[2; 5]$ je $[1{,}5; 3{,}5]$. Bod dělící úsečku $AB$ v poměru $m:n$ (měřeno od bodu $A$):

$$
C = A + \frac{m}{m+n}(B - A)
$$

> [!POZOR] Rozdíl $B - A$ je vektor, ne bod. Bod $C$ dělící úsečku získáš až přičtením k $A$ — samotný zlomek $(B-A)/3$ je jen posunutí.

## Skalární součin a kolmost

Skalární součin dvou vektorů je číslo — součet součinů po složkách:

$$
u\cdot v = u_1 v_1 + u_2 v_2 + u_3 v_3
$$

> [!VETA] Kolmost a rovnoběžnost (pro nenulové vektory):
>
> $$
> u\perp v \iff u\cdot v = 0
> $$
>
> Vektory jsou rovnoběžné, právě když je jeden násobkem druhého.

Úhel vektorů spočítáš ze vzorce:

$$
\cos\varphi = \frac{u\cdot v}{|u|\cdot |v|}
$$

Znaménko součinu prozradí typ úhlu:

| $u\cdot v$ | úhel |
|---|---|
| kladný | ostrý |
| nulový | pravý |
| záporný | tupý |

> [!POZOR] Skalární součin není součin velikostí. Vzorec $|u|\cdot|v|$ dává $|u\cdot v|$ jen pro rovnoběžné vektory — obecně musíš sčítat součiny po složkách.

## Přímka v rovině

Tři tvary rovnice přímky:

| Tvar | Rovnice | Kdy se hodí |
|---|---|---|
| parametrický | $x = a + ts_1$, $y = b + ts_2$ | znám bod a směr |
| obecný | $ax + by + c = 0$ | vzdálenosti, polohy |
| směrnicový | $y = mx + q$ | graf, kolmost přes $m$ |

Směrový vektor $s$ určuje směr přímky, normálový vektor $n$ je k ní kolmý. Z obecné rovnice se normála čte přímo:

$$
p\colon ax + by + c = 0 \quad\Rightarrow\quad n = (a;\, b)
$$

A naopak: ze směrového vektoru $(s_1; s_2)$ vyrobíš normálový prohozením složek a změnou jednoho znaménka, například $(-s_2; s_1)$. Přímka bodem $[x_0; y_0]$ se směrnicí $m$:

$$
y - y_0 = m(x - x_0)
$$

Směrnice přímky dané body $[x_1; y_1]$ a $[x_2; y_2]$:

$$
m = \frac{y_2-y_1}{x_2-x_1}
$$

> [!POZOR] Směrnice je přírůstek $y$ lomeno přírůstek $x$. Převrácený zlomek $(x_2-x_1)/(y_2-y_1)$ není směrnice — a svislá přímka $x = c$ nemá směrnici vůbec.

## Vzájemná poloha dvou přímek

Dvě přímky v rovině jsou rovnoběžné, totožné, nebo se protínají v jednom bodě. Rozhodují normálové vektory:

| Normály | Rovnice | Poloha |
|---|---|---|
| $n_1 = k n_2$ | druhá je $k$-násobkem první | totožné |
| $n_1 = k n_2$ | absolutní členy v jiném poměru | rovnoběžné různé |
| nejsou násobky | — | jeden průsečík |

Průsečík najdeš vyřešením soustavy obou rovnic (sčítací nebo dosazovací metoda). Kolmost přes směrnice:

$$
m_1\cdot m_2 = -1
$$

Přímka kolmá k přímce se směrnicí $m$ má směrnici $-1/m$.

> [!POZOR] U totožnosti musí být ve stejném poměru všechny tři koeficienty včetně absolutního členu. Rovnice $2x + 4y - 6 = 0$ a $x + 2y - 3 = 0$ popisují tutéž přímku, ale $2x + 4y - 5 = 0$ už je jiná (rovnoběžná) přímka.

## Rovina v prostoru

Rovina má obecnou rovnici s normálovým vektorem $(a; b; c)$:

$$
\rho\colon ax + by + cz + d = 0
$$

Normála je $n = (a; b; c)$. Bod v rovině leží, právě když jeho souřadnice rovnici splňují — dosazení rozhodne. Rovinu bodem se známou normálou zapíšeš okamžitě: koeficienty $a, b, c$ opíšeš a $d$ dopočítáš dosazením bodu.

Prochází-li rovina body $[p; 0; 0]$, $[0; q; 0]$ a $[0; 0; r]$, pomůže úsekový tvar:

> [!VETA] Úsekový tvar roviny (pro $p, q, r$ různé od nuly):
>
> $$
> \frac{x}{p} + \frac{y}{q} + \frac{z}{r} = 1
> $$
>
> Úseky jsou ve jmenovatelích — po vynásobení dostaneš obecnou rovnici.

## Vzájemná poloha rovin a přímky s rovinou

Dvě roviny jsou rovnoběžné (normály jsou násobky), totožné (celé rovnice jsou násobky), nebo se protínají v přímce. U rovnoběžných různých rovin vždy zkontroluj absolutní členy — stejně jako u přímek.

Průsečík přímky s rovinou: dosaď parametrické vyjádření přímky do rovnice roviny, vyřeš pro $t$ a dosaď zpět. Přímka:

$$
x = a + ts_1,\quad y = b + ts_2,\quad z = c + ts_3
$$

patří dosadit do $ax + by + cz + d = 0$. Je-li směrový vektor přímky kolmý k normále roviny, je přímka s rovinou rovnoběžná (nebo v ní leží — rozhodne jeden bod).

> [!POZOR] Parametr $t$ průsečíku není odpověď — odpovědí je bod. Po výpočtu $t$ ho dosaď zpět do rovnic přímky; výchozí bod přímky (pro $t = 0$) v rovině obvykle neleží.

## Vzdálenosti

Vzdálenost dvou bodů je velikost vektoru jejich rozdílu. Pro $A = [x_1; y_1]$ a $B = [x_2; y_2]$:

$$
|AB| = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}
$$

> [!VETA] Vzdálenost bodu od přímky a od roviny:
>
> $$
> v = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2+b^2}}
> $$
>
> Pro rovinu přidej člen s $z$ do čitatele i pod odmocninu:
>
> $$
> v = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2+b^2+c^2}}
> $$

Vzdálenost dvou rovnoběžných přímek se stejnými normálami $(a; b)$:

$$
v = \frac{|c_1-c_2|}{\sqrt{a^2+b^2}}
$$

> [!POZOR] Ve jmenovateli je vždy norma normály $\sqrt{a^2+b^2}$, nikdy součet $a + b$ a nikdy $a^2 + b^2$ bez odmocniny. Čitatel bez absolutní hodnoty umí vyjít záporný — vzdálenost je nezáporná.

## Odchylky přímek

Odchylka dvou přímek je ostrý (nejvýše pravý) úhel, který svírají. Ze směrnic:

$$
\tan\varphi = \left|\frac{m_1-m_2}{1+m_1 m_2}\right|
$$

Kolmé přímky poznáš i bez vzorce: $m_1\cdot m_2 = -1$. Stejný úhel svírají i normálové vektory obou přímek (bereš vždy ostrý z obou úhlů).

> [!POZOR] Tangens odchylky má ve vzorci jmenovatel $1 + m_1 m_2$. Samotný rozdíl $m_1 - m_2$ není odpověď — a směrnice si nejprve vyjádři z obecných rovnic.

## Kružnice

Kružnice se středem $S = [m; n]$ a poloměrem $r$:

$$
(x-m)^2 + (y-n)^2 = r^2
$$

Obecnou rovnici převedeš doplněním na čtverec: $x^2 - 4x$ doplníš na $(x-2)^2 - 4$ a stejně pro $y$, konstanty sečteš vpravo. Kružnice s průměrem $AB$: střed najdeš jako střed úsečky $AB$ (průměr souřadnic) a pro poloměr platí:

$$
r^2 = \frac{|AB|^2}{4}
$$

Tečna v bodě $T$ kružnice je kolmá k poloměru $ST$ — normála tečny je vektor $ST$. Vzájemnou polohu přímky a kružnice určí vzdálenost $v$ středu od přímky:

| Porovnání | Poloha | Společné body |
|---|---|---|
| $v < r$ | sečna | 2 |
| $v = r$ | tečna | 1 |
| $v > r$ | vnější přímka | 0 |

> [!POZOR] Dvě nezávislé chyby: střed se čte s opačnými znaménky ($(x-2)^2$ znamená $m = 2$) a vpravo je $r^2$, ne $r$. Rovnice $(x-2)^2 + (y+3)^2 = 16$ má střed $[2; -3]$ a poloměr $4$.

## Elipsa, hyperbola a parabola

Elipsa je množina bodů s konstantním součtem vzdáleností od dvou ohnisek. Se středem v počátku a hlavní poloosou $a$ na ose $x$:

$$
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1
$$

Ohniska leží na hlavní ose ve vzdálenosti $c$ od středu, kde $c^2 = a^2 - b^2$. Excentricita $e = c/a$ měří protáhlost: pro kružnici je $0$, pro elipsu vždy menší než $1$. Hyperbola má v rovnici minus a excentricitu větší než $1$:

$$
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1
$$

Parabola $y = ax^2 + bx + c$ má vrchol v bodě s $x$-ovou souřadnicí $-b/2a$:

$$
x_v = -\frac{b}{2a}
$$

a $y$-ovou souřadnici dopočítáš dosazením. Přehled kuželoseček:

| Kuželosečka | Rovnice | Excentricita |
|---|---|---|
| kružnice | $(x-m)^2 + (y-n)^2 = r^2$ | $e = 0$ |
| elipsa | $x^2/a^2 + y^2/b^2 = 1$ | $e < 1$ |
| hyperbola | $x^2/a^2 - y^2/b^2 = 1$ | $e > 1$ |
| parabola | $y = ax^2 + bx + c$ | $e = 1$ |

> [!VETA] Elipsa, hyperbola a parabola jednou větou: elipsa má součet vzdáleností od ohnisek konstantní, hyperbola rozdíl, parabola stejnou vzdálenost od ohniska a řídicí přímky.

> [!POZOR] U elipsy je $a$ vždy delší poloosa ($a > b$). Zlomek $b/a$ ani $c/b$ není excentricita — a výsledek $e > 1$ u elipsy znamená chybu ve výpočtu.

## Typové úlohy SCIO k analytické geometrii

- **Parametr z kolmosti.** Najdi $t$, pro které jsou vektory či přímky kolmé. Nástroj: nulový skalární součin normál; hlídej znaménka u všech složek.
- **Bod na přímce či v rovině.** Ověř kandidáty dosazením, nebo dopočítej $t$ z rovnice. Nástroj: dosazení rozhodne; bod musí splnit celou rovnici.
- **Totožnost a rovnoběžnost s parametrem.** Porovnej poměry všech koeficientů včetně absolutního členu. Nástroj: poměr normál určí kandidáta, absolutní členy rozhodnou mezi totožností a rovnoběžností.
- **Průsečík přímky s rovinou.** Dosaď parametrické rovnice do rovnice roviny. Nástroj: vyřeš pro $t$, pak dosaď zpět; odpovědí je bod, ne parametr.
- **Vzdálenost se zapomenutým dělením.** Čitatel vyjde snadno, jmenovatel se ztrácí. Nástroj: norma normály pod odmocninou; výsledek bez dělení je vždy špatně.
- **Nejbližší ze čtyř bodů.** Porovnej čitatele vzdáleností při společném jmenovateli. Nástroj: stačí porovnat absolutní hodnoty čitatelů; počítej všechny čtyři, pořadí se nedá odhadnout.
- **Odchylka přes směrnice.** Nejprve vyjádři obě směrnice z obecných rovnic. Nástroj: vzorec s tangens včetně jmenovatele; kolmost zkontroluj součinem $-1$.
- **Kružnice doplněním na čtverec.** Obecná rovnice na středový tvar. Nástroj: doplň obě proměnné, konstanty sečti vpravo; střed má opačná znaménka, vpravo je $r^2$.
- **Tečna a poloha přímky ke kružnici.** Tečna je kolmá k poloměru; polohu určí vzdálenost středu. Nástroj: normála tečny je poloměr; porovnej $v$ s $r$.
- **Excentricita elipsy.** Z poloos dopočítej $c$, pak $e = c/a$. Nástroj: $c^2 = a^2 - b^2$; výsledek musí být menší než $1$.

## Řešené příklady

### Příklad 1

**Zadání:** Určete $t$, pro které jsou vektory $u = (2; t; 1)$ a $v = (t; -1; 4)$ navzájem kolmé.

**Řešení:**

1. Kolmost znamená nulový skalární součin: $u\cdot v = 0$.
2. Dosadíme po složkách:

   $$
   2t - t + 4 = 0
   $$

   tedy $t = -4$.

3. Zkouška dosazením $t = -4$:

   $$
   2\cdot(-4) + (-4)\cdot(-1) + 1\cdot 4 = -8 + 4 + 4 = 0
   $$

   Skalární součin je nulový, vektory jsou tedy kolmé.

### Příklad 2

**Zadání:** Napište obecnou rovnici přímky procházející bodem $[3; -1]$ se směrovým vektorem $(1; 2)$.

**Řešení:**

1. Ze směrového vektoru vyrobíme normálový: prohození složek a změna jednoho znaménka dá $(-2; 1)$.
2. Obecná rovnice má tvar $-2x + y + c = 0$. Dosazení bodu $[3; -1]$:

   $$
   -2\cdot 3 + (-1) + c = 0
   $$

   tedy $c = 7$.

3. Výsledek $-2x + y + 7 = 0$ ověříme dalším bodem přímky $[4; 1]$: $-8 + 1 + 7 = 0$.

### Příklad 3

**Zadání:** Určete vzdálenost bodu $[5; 2]$ od přímky $2x - y - 4 = 0$.

**Řešení:**

1. Dosadíme do vzorce pro vzdálenost bodu od přímky:

   $$
   v = \frac{|2\cdot 5 - 2 - 4|}{\sqrt{5}} = \frac{4}{\sqrt{5}} = \frac{4\sqrt{5}}{5}
   $$

2. Iracionální výsledek je v pořádku — chyba by byla zapomenout dělit normou (pak by vyšlo $4$).

### Příklad 4

**Zadání:** Určete střed a poloměr kružnice $x^2 + y^2 + 6x - 2y - 6 = 0$.

**Řešení:**

1. Doplníme na čtverce zvlášť pro $x$ a pro $y$:

   $$
   (x+3)^2 - 9 + (y-1)^2 - 1 - 6 = 0
   $$

2. Konstanty převedeme vpravo:

   $$
   (x+3)^2 + (y-1)^2 = 16
   $$

3. Střed je $[-3; 1]$, poloměr $4$. Pozor: $(x+3)^2$ znamená $m = -3$, ne $3$.

### Příklad 5

**Zadání:** Pro které $t$ leží průsečík přímek $p: x - y = 1$ a $q: 2x + y = 11$ na přímce $r: x + ty = 9$?

**Řešení:**

1. Sečteme rovnice $p$ a $q$: $3x = 12$, tedy $x = 4$; z $p$ pak $y = 3$. Průsečík je $[4; 3]$.
2. Dosadíme $[4; 3]$ do rovnice přímky $r$:

   $$
   4 + 3t = 9
   $$

   tedy $t = 5/3$.

3. Dvoukroková úloha: nejprve průsečík dvou přímek, pak parametr ze třetí rovnice. Klíčové je dosadit průsečík do rovnice přímky $r$.

## Shrnutí vzorců

- $|u| = \sqrt{u_1^2+u_2^2}$ (v prostoru přidej třetí složku)
- $u\cdot v = u_1v_1 + u_2v_2$
- kolmost: $u\perp v \iff u\cdot v = 0$
- $\cos\varphi = (u\cdot v)/(|u|\cdot|v|)$
- střed úsečky:

  $$
  S = \left[\frac{a+c}{2};\, \frac{b+d}{2}\right]
  $$

- přímka bodem se směrnicí: $y - y_0 = m(x-x_0)$
- $m = (y_2-y_1)/(x_2-x_1)$
- kolmé směrnice: $m_1 m_2 = -1$
- vzdálenost bodu od přímky:

  $$
  v = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2+b^2}}
  $$

- vzdálenost bodu od roviny:

  $$
  v = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2+b^2+c^2}}
  $$

- kružnice: $(x-m)^2 + (y-n)^2 = r^2$
- elipsa: $x^2/a^2 + y^2/b^2 = 1$, $c^2 = a^2-b^2$, $e = c/a$
- vrchol paraboly: $x_v = -b/2a$
- odchylka přímek:

  $$
  \tan\varphi = \left|\frac{m_1-m_2}{1+m_1 m_2}\right|
  $$
