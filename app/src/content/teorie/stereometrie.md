# Stereometrie

Stereometrie je geometrie v prostoru: zkoumá vzájemnou polohu bodů, přímek a rovin a měří tělesa — jejich délky, obsahy, objemy a povrchy. Ve SCIO se objevuje ve dvou podobách: polohové a metrické vztahy (úhlopříčky, vzdálenosti, odchylky) a objemy a povrchy těles.

## Body, přímky a roviny

Základní kameny prostoru jsou bod, přímka a rovina. Rovina je určena třemi body, které neleží v jedné přímce, nebo přímkou a bodem mimo ni, nebo dvěma různoběžkami.

Dvě přímky v prostoru jsou rovnoběžné (leží v jedné rovině a nemají společný bod), různoběžné (mají právě jeden společný bod), nebo mimoběžné (neleží v žádné společné rovině a nemají společný bod).

> [!VETA] Mimoběžky nemají společný bod a nejsou rovnoběžné. Typický příklad v krychli: hrana dolní podstavy a hrana horní podstavy v kolmém směru.

Přímka a rovina jsou rovnoběžné (nemají společný bod, nebo přímka leží v rovině), nebo různoběžné (protínají se v jediném průsečíku). Přímka je kolmá k rovině, když je kolmá ke všem přímkám roviny procházejícím průsečíkem.

Dvě roviny jsou rovnoběžné, nebo se protínají v přímce — průsečnici.

## Úhlopříčky krychle a kvádru

Krychle je nejčastější model: všechny hrany stejně dlouhé, všechny stěny čtverce, všechny úhly pravé. Pro hranu $a$ platí pro stěnovou úhlopříčku:

$$
u_s = a\sqrt{2}
$$

Tělesová úhlopříčka spojuje protější vrcholy přes vnitřek tělesa. Z Pythagorovy věty v trojúhelníku se stranami $a$, $a\sqrt{2}$ a $u_t$ plyne:

$$
u_t = a\sqrt{3}
$$

> [!VETA] Tělesová úhlopříčka krychle o hraně $a$ měří $a\sqrt{3}$. Stěnová měří $a\sqrt{2}$ a leží ve stěně.

Pro kvádr o hranách $a$, $b$ a $c$ platí:

$$
u = \sqrt{a^2 + b^2 + c^2}
$$

Tělesové úhlopříčky kvádru se půlí ve středu tělesa. Vzdálenost středu krychle od vrcholu je tedy polovina tělesové úhlopříčky:

$$
d = \dfrac{a\sqrt{3}}{2}
$$

> [!POZOR] Stěnová úhlopříčka ($a\sqrt{2}$) a tělesová úhlopříčka ($a\sqrt{3}$) se stále pletou. Tělesová prochází vnitřkem a je delší — poznamenej si, která kde leží.

## Vzdálenosti v prostoru

Vzdálenost bodu od roviny je délka kolmice spuštěné z bodu na rovinu. Vzdálenost dvou mimoběžek je délka jejich společné kolmice — nejkratší spojnice bodu jedné přímky s bodem druhé.

> [!VETA] Vzdálenost bodu od roviny měří vždy kolmice. Šikmá spojnice je delší a do výpočtu nepatří.

Praktický postup v krychli: zavést souřadnice s vrcholem $A$ v počátku a hranami podél os. Vzdálenost bodů se pak počítá vzorcem:

$$
d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}
$$

Rovina se v souřadnicích pozná dosazením: body $B$, $D$ a $E$ krychle o hraně $6$ mají souřadnice $(6, 0, 0)$, $(0, 6, 0)$ a $(0, 0, 6)$, takže všechny splňují rovnici $x + y + z = 6$.

Krychle má $9$ rovin souměrnosti: $3$ středové rovnoběžné se stěnami a $6$ úhlopříčných procházejících protějšími hranami.

## Odchylky přímek a rovin

Odchylka dvou přímek je úhel sevřený jejich rovnoběžkami vedenými společným bodem. U mimoběžek tedy jednu přímku posuneme tak, aby se s druhou protnula, a měříme úhel v průsečíku. Odchylka se udává od $0°$ do $90°$.

Kolmost se pozná skalárním součinem: směrové vektory $(x_1, y_1, z_1)$ a $(x_2, y_2, z_2)$ jsou kolmé právě když:

$$
x_1x_2 + y_1y_2 + z_1z_2 = 0
$$

Odchylka přímky od roviny je úhel mezi přímkou a jejím kolmým průmětem do roviny. Pro tělesovou úhlopříčku krychle a rovinu podstavy platí (pravoúhlý trojúhelník s odvěsnou $a$ a přeponou $a\sqrt{3}$):

$$
\sin\varphi = \dfrac{1}{\sqrt{3}} = \dfrac{\sqrt{3}}{3}
$$

Odchylka dvou rovin je úhel dvou přímek, z nichž každá leží v jedné rovině a obě jsou kolmé k průsečnici v témže bodě.

> [!POZOR] Odchylku mimoběžek nelze odečíst z obrázku bez posunutí. Bez posunutí do společného bodu měříš úhel, který v prostoru neexistuje.

## Mnohostěny a Eulerova věta

Hranol má dvě shodné rovnoběžné podstavy spojené pláštěm z rovnoběžníků. Kolmý hranol má boční hrany kolmé k podstavám; pravidelný hranol má navíc pravidelnou podstavu (např. čtverec nebo rovnostranný trojúhelník).

Jehlan má jednu podstavu a boční stěny — trojúhelníky se společným vrcholem. Pravidelný čtyřboký jehlan má podstavu čtverec a vrchol nad středem podstavy. Pravidelný čtyřstěn má všechny čtyři stěny rovnostranné trojúhelníky.

> [!VETA] Eulerova věta pro konvexní mnohostěn: počet vrcholů minus počet hran plus počet stěn je roven dvěma.
>
> $$
> v - h + s = 2
> $$

Výška pravidelného čtyřstěnu o hraně $a$ (pata výšky je v těžišti podstavy):

$$
v_t = a\sqrt{\dfrac{2}{3}} = \dfrac{a\sqrt{6}}{3}
$$

> [!POZOR] Výška boční stěny jehlanu není výška tělesa. Stěnová výška $w$ a tělesová výška $v$ tvoří spolu s polovinou podstavné hrany pravoúhlý trojúhelník — $w$ je přepona.

## Rotační tělesa

Válec vznikne rotací obdélníku kolem jedné strany, kužel rotací pravoúhlého trojúhelníku kolem odvěsny a koule rotací kruhu kolem průměru. Strana kužele $s$, poloměr $r$ a výška $v$ tvoří pravoúhlý trojúhelník:

$$
s^2 = r^2 + v^2
$$

Osový řez válce je obdélník, osový řez kužele rovnoramenný trojúhelník a osový řez koule kruh. Chybějící rozměr se dopočítá z osového řezu Pythagorovou větou.

Koule opsaná krychli o hraně $a$ prochází všemi vrcholy — její průměr je tělesová úhlopříčka:

$$
r_{ops} = \dfrac{a\sqrt{3}}{2}
$$

Koule vepsaná krychli se dotýká středů stěn:

$$
r_{veps} = \dfrac{a}{2}
$$

## Objemy a povrchy

Objem hranolu je obsah podstavy krát výška; jehlan a kužel mají navíc třetinu:

$$
V = S_p \cdot v \qquad V_{jehlan} = \dfrac{S_p \cdot v}{3}
$$

Přehled vzorců pro výpočet objemu $V$ a povrchu $S$:

| Těleso | Objem | Povrch |
|---|---|---|
| Krychle o hraně $a$ | $V = a^3$ | $S = 6a^2$ |
| Kvádr $a$, $b$, $c$ | $V = abc$ | $S = 2(ab+bc+ca)$ |
| Hranol | $V = S_p v$ | $S = 2S_p + S_{pl}$ |
| Pravidelný čtyřstěn o hraně $a$ | $V = a^3\sqrt{2}/12$ | $S = a^2\sqrt{3}$ |
| Válec | $V = \pi r^2 v$ | $S = 2\pi r(r+v)$ |
| Kužel | $V = \pi r^2 v/3$ | $S = \pi r(r+s)$ |
| Koule | $V = 4\pi r^3/3$ | $S = 4\pi r^2$ |
| Polokoule | $V = 2\pi r^3/3$ | $S = 3\pi r^2$ včetně dna |

U jehlanu a kužele si hlídej, co dosazuješ za výšku: u jehlanu kolmici z vrcholu na podstavu (ne stěnovou výšku ani boční hranu), u kužele osu (ne stranu).

## Změna měřítka

> [!VETA] Při změně všech délek $k$-krát se obsahy změní $k^2$-krát a objemy $k^3$-krát.

Obráceně: z osminásobného objemu plynou dvojnásobné hrany ($\sqrt[3]{8} = 2$) a čtyřnásobný povrch ($2^2 = 4$). Stejně funguje poměr koulí opsané a vepsané krychli: poměr poloměrů $\sqrt{3}$ dává poměr objemů $(\sqrt{3})^3$.

> [!POZOR] Faktor změny objemu se nepřenáší na povrch. Osmkrát větší objem znamená čtyřikrát větší povrch, ne osmkrát.

## Typové úlohy SCIO ke stereometrii

- **Úhlopříčky krychle a kvádru.** Přímé dosazení do $a\sqrt{2}$, $a\sqrt{3}$ nebo odmocniny ze součtu čtverců. Nástroj: poznat, která úhlopříčka se ptá.
- **Vzdálenost bodu od roviny a od středu.** Souřadnice v krychli, rovnice roviny dosazením, kolmice. Nástroj: souřadnicový model s vrcholem v počátku.
- **Odchylka mimoběžek.** Posunout do společného bodu, pak skalární součin nebo známý úhel. Nástroj: směrové vektory.
- **Odchylka přímky od roviny.** Úhel mezi přímkou a jejím průmětem; sinus z pravoúhlého trojúhelníku. Nástroj: nakreslit trojúhelník s hranou a úhlopříčkou.
- **Eulerova věta a počty prvků.** Doplnit třetí údaj ze vztahu $v - h + s = 2$; u hranolů násobit podstavu dvěma. Nástroj: vzorec plus kontrola řádu.
- **Koule vepsaná a opsaná.** Průměr vepsané je hrana, průměr opsané tělesová úhlopříčka. Nástroj: řez tělesem středem koule.
- **Objem a povrch hranolu, jehlanu, válce, kužele a koule.** Přímé dosazení; u jehlanu a kužele třetina. Nástroj: tabulka vzorců výše.
- **Chybějící rozměr.** Výška kužele ze strany, hrana krychle z povrchu, poloměr z objemu. Nástroj: osový řez nebo vyjádření ze vzorce.
- **Měřítko.** Převody mezi délkami, obsahy a objemy přes $k$, $k^2$ a $k^3$. Nástroj: nejdřív určit $k$ z toho, co je známo.
- **Složená tělesa.** Odečet jehlanu z krychle, kužel ve válci, polokoule proti kuželi. Nástroj: spočítat každou část zvlášť a pak sečíst nebo odečíst.

## Řešené příklady

### Příklad 1

**Zadání:** Kvádr má hrany $3$, $4$ a $12$. Určete délku tělesové úhlopříčky.

**Řešení:**

1. Tělesová úhlopříčka kvádru spojuje protější vrcholy přes vnitřek — Pythagorova věta se použije dvakrát, což dá odmocninu ze součtu čtverců všech tří hran:

   $$
   u = \sqrt{9 + 16 + 144} = \sqrt{169} = 13
   $$

2. Kontrola: výsledek je delší než nejdelší hrana a kratší než součet hran ($13$ je mezi $12$ a $19$).

### Příklad 2

**Zadání:** Pravidelný čtyřboký jehlan má podstavnou hranu $6$ a výšku $4$. Určete jeho povrch.

**Řešení:**

1. Povrch tvoří podstava a $4$ boční trojúhelníky. Boční trojúhelník má základnu $6$ a výšku rovnou stěnové výšce $w$ — ne výšce tělesa.
2. Stěnová výška z pravoúhlého trojúhelníku s odvěsnami $4$ a $3$:

   $$
   w = \sqrt{16 + 9} = 5
   $$

3. Povrch je podstava plus čtyři trojúhelníky:

   $$
   S = 36 + 4 \cdot \dfrac{6 \cdot 5}{2} = 96
   $$

### Příklad 3

**Zadání:** V krychli o hraně $6$ určete vzdálenost vrcholu $A$ od roviny $BDE$.

**Řešení:**

1. Zaveď souřadnice: $A$ do počátku, hrany podél os. Body roviny jsou $(6, 0, 0)$, $(0, 6, 0)$ a $(0, 0, 6)$.
2. Všechny tři body splňují rovnici $x + y + z = 6$, takže vzdálenost počátku od roviny je:

   $$
   d = \dfrac{6}{\sqrt{3}} = 2\sqrt{3}
   $$

3. Kontrola: tělesová úhlopříčka měří $6\sqrt{3}$ a rovina $BDE$ je na ni kolmá a dělí ji v poměru $1:2$ — kratší díl je $2\sqrt{3}$.

### Příklad 4

**Zadání:** Do krychle o hraně $4$ je vepsána koule. Určete její objem.

**Řešení:**

1. Vepsaná koule se dotýká středů stěn — její průměr je roven hraně krychle, takže $r = 2$.
2. Objem koule:

   $$
   V = \dfrac{4}{3}\pi \cdot 8 = \dfrac{32\pi}{3}
   $$

3. Kontrola řádu: $32\pi/3$ je asi $33{,}5$, zatímco krychle má objem $64$ — koule vyplňuje zhruba polovinu, což odpovídá obrázku.

## Shrnutí vzorců

- stěnová úhlopříčka krychle: $u_s = a\sqrt{2}$
- tělesová úhlopříčka krychle: $u_t = a\sqrt{3}$
- úhlopříčka kvádru:

  $$
  u = \sqrt{a^2 + b^2 + c^2}
  $$

- Eulerova věta: $v - h + s = 2$
- strana kužele: $s^2 = r^2 + v^2$
- objem hranolu: $V = S_p v$; objem jehlanu: $V = S_p v/3$
- válec: $V = \pi r^2 v$ a $S = 2\pi r(r+v)$
- kužel: $V = \pi r^2 v/3$ a $S = \pi r(r+s)$
- koule: $V = 4\pi r^3/3$ a $S = 4\pi r^2$
- koule opsaná krychli: $r = a\sqrt{3}/2$; vepsaná: $r = a/2$
- měřítko $k$: délky $k$-krát, obsahy $k^2$-krát, objemy $k^3$-krát
