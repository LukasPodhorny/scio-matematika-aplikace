# Goniometrie

Goniometrie spojuje úhly s čísly: každému úhlu přiřadí hodnoty sinus, kosinus, tangens a kotangens. Ve SCIO se objevuje ve třech podobách: úpravy výrazů a funkční vlastnosti, rovnice a nerovnice, a trigonometrie trojúhelníku (sinová a kosinová věta).

## Úhel a jeho míry

Úhel měříme ve stupních nebo v radiánech. Radián je oblouk jednotkové kružnice o délce 1, takže plný úhel $360°$ odpovídá $2\pi$ radiánům.

> [!VETA] Převod stupně–radiány:
>
> $$
> 180° = \pi
> $$
>
> Stupně na radiány: násobit $\pi/180$; radiány na stupně: násobit $180/\pi$.

Základní převody:

| Stupně | 30° | 45° | 60° | 90° | 180° | 270° | 360° |
|---|---|---|---|---|---|---|---|
| Radiány | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ | $\pi$ | $3\pi/2$ | $2\pi$ |

Úhel je orientovaný: měří se od kladné poloosy $x$ proti směru hodinových ručiček (kladný směr). Záporný úhel jde po směru ručiček. Úhly lišící se o $2\pi$ (celé otočky) určují stejný bod na kružnici — proto jsou goniometrické funkce periodické.

## Jednotková kružnice a definice funkcí

Na jednotkové kružnici (střed v počátku, poloměr 1) každému úhlu $x$ odpovídá bod, kam dopadne koncové rameno. Souřadnice tohoto bodu definují sinus a kosinus.

> [!VETA] Pro úhel $x$ je $\cos x$ vodorovná a $\sin x$ svislá souřadnice příslušného bodu jednotkové kružnice.
>
> $$
> \tan x = \dfrac{\sin x}{\cos x} \qquad \cot x = \dfrac{\cos x}{\sin x}
> $$
>
> Tangens je definován pro $\cos x$ ≠ $0$, kotangens pro $\sin x$ ≠ $0$.

V pravoúhlém trojúhelníku s ostrým úhlem α:

- $\sin \alpha$ = protilehlá / přepona
- $\cos \alpha$ = přilehlá / přepona
- $\tan \alpha$ = protilehlá / přilehlá

### Znaménka v kvadrantech

| Kvadrant | úhel | sin | cos | tg, cotg |
|---|---|---|---|---|
| I. | $(0, \pi/2)$ | $+$ | $+$ | $+$ |
| II. | $(\pi/2, \pi)$ | $+$ | $-$ | $-$ |
| III. | $(\pi, 3\pi/2)$ | $-$ | $-$ | $+$ |
| IV. | $(3\pi/2, 2\pi)$ | $-$ | $+$ | $-$ |

Pomůcka: „vše, sinus, tangens, kosinus“ — v I. kvadrantu je vše kladné, ve II. jen sinus, ve III. jen tangens a kotangens, ve IV. jen kosinus.

### Základní hodnoty

| $x$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
|---|---|---|---|---|---|
| $\sin x$ | $0$ | $1/2$ | $\sqrt{2}/2$ | $\sqrt{3}/2$ | $1$ |
| $\cos x$ | $1$ | $\sqrt{3}/2$ | $\sqrt{2}/2$ | $1/2$ | $0$ |
| $\tan x$ | $0$ | $\sqrt{3}/3$ | $1$ | $\sqrt{3}$ | nedef. |

Pomůcka pro sinus: hodnoty $0, 1, 2, 3, 4$ pod odmocninou, vše lomeno dvěma:

$$
\dfrac{\sqrt{0}}{2},\ \dfrac{\sqrt{1}}{2},\ \dfrac{\sqrt{2}}{2},\ \dfrac{\sqrt{3}}{2},\ \dfrac{\sqrt{4}}{2}
$$

Kosinus je stejná řada pozpátku.

## Základní vzorce

> [!VETA] Goniometrická jednička (plyne z Pythagorovy věty na jednotkové kružnici):
>
> $$
> \sin^2 x + \cos^2 x = 1
> $$

Z ní plyne:

$$
\sin^2 x = 1 - \cos^2 x \qquad \cos^2 x = 1 - \sin^2 x
$$

a dále:

$$
1 + \tan^2 x = \dfrac{1}{\cos^2 x} \qquad 1 + \cot^2 x = \dfrac{1}{\sin^2 x}
$$

První vztah platí pro $\cos x$ ≠ $0$, druhý pro $\sin x$ ≠ $0$.

> [!VETA] Součtové vzorce:
>
> $$
> \begin{aligned}
> \sin(x \pm y) &= \sin x \cos y \pm \cos x \sin y \\
> \cos(x \pm y) &= \cos x \cos y \mp \sin x \sin y
> \end{aligned}
> $$

Pro $y = x$ dostaneme vzorce pro dvojnásobný úhel:

$$
\sin 2x = 2\sin x \cos x
$$

$$
\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x
$$

Tři tvary pro $\cos 2x$ se hodí podle toho, kterou funkci chceme zachovat.

> [!POZOR] Nejčastější chyba: $\sin(x+y) = \sin x + \sin y$. Není. Sinus součtu není součet sinů — vždy rozepiš podle součtového vzorce.

Užitečné úpravy:

- $\sin(\pi - x) = \sin x$, $\cos(\pi - x) = -\cos x$
- $\sin(\pi/2 - x) = \cos x$, $\cos(\pi/2 - x) = \sin x$
- $\sin(-x) = -\sin x$, $\cos(-x) = \cos x$
- $\sin(x + \pi) = -\sin x$, $\cos(x + \pi) = -\cos x$

### Kondenzace a sin x + cos x

Výraz $a\sin x + b\cos x$ lze přepsat na jedinou funkci:

$$
a\sin x + b\cos x = \sqrt{a^2+b^2}\sin(x + \varphi)
$$

pro vhodný posun $\varphi$. Obor hodnot je proto $\langle -\sqrt{a^2+b^2}, \sqrt{a^2+b^2}\rangle$.

> [!POZOR] Maximum součtu $\sin x + \sqrt{3}\cos x$ není $1 + \sqrt{3}$. Maxima obou členů nenastávají ve stejném bodě — správné maximum je $\sqrt{1+3} = 2$.

Triky se čtvercem (umocnění součtu dá součin):

$$
(\sin x + \cos x)^2 = 1 + \sin 2x \qquad (\sin x - \cos x)^2 = 1 - \sin 2x
$$

## Vlastnosti a grafy

- Definiční obory: $\sin$ a $\cos$ na celém $\mathbb{R}$; $\tan$ na $\mathbb{R}$ bez bodů $\pi/2 + k\pi$; $\cot$ na $\mathbb{R}$ bez bodů $k\pi$.
- Obory hodnot: $\sin$ a $\cos$ mají $\langle -1, 1\rangle$; $\tan$ a $\cot$ celé $\mathbb{R}$.
- Perioda: $\sin$, $\cos$ mají $2\pi$; $\tan$, $\cot$ mají $\pi$.
- Sudost: $\cos$ je sudá ($\cos(-x) = \cos x$); $\sin$, $\tan$, $\cot$ jsou liché (např. $\sin(-x) = -\sin x$).

> [!VETA] Perioda funkce $a\sin(bx + c) + d$ je (pro $b$ ≠ $0$):
>
> $$
> T = \dfrac{2\pi}{|b|}
> $$
>
> Amplituda je $|a|$. Pro tangens je perioda $\pi/|b|$.

Graf $y = \sin(x - s)$ je graf sinu posunutý o $s$ doprava (pozor na znaménko: minus znamená doprava). Graf $y = \sin x + d$ je posun o $d$ nahoru.

> [!POZOR] Posun doprava o $\pi/2$ dává $\sin(x - \pi/2) = -\cos x$, ne $\cos x$. Znaménko u posunu se snadno otočí — ověř dosazením jednoho bodu (např. $x = 0$).

Perioda součtu dvou funkcí je nejmenší společný násobek period: např. $\sin 3x$ má periodu $2\pi/3$, $\cos(x/2)$ má $4\pi$, součet má periodu $4\pi$ (protože $4\pi$ je násobkem $2\pi/3$ právě $6\times$).

## Goniometrické rovnice

Základní rovnice (pro $|a| \le 1$ u sinu a kosinu):

- $\sin x = a$: $x = \arcsin a + 2k\pi$ nebo $x = \pi - \arcsin a + 2k\pi$
- $\cos x = a$: $x = \pm\arccos a + 2k\pi$
- $\tan x = a$: jediná rodina $x = \arctan a + k\pi$ (perioda $\pi$)

Postup u složitějších rovnic:

1. **Substituce.** Rovnice typu $2\sin^2 x - 3\sin x + 1 = 0$: substituuj $t = \sin x$, vyřeš kvadratickou rovnici, pak pro každé $t$ řeš $\sin x = t$. Každé $t$ mimo $\langle -1, 1\rangle$ zahodíš (žádné řešení).
2. **Vytýkání místo dělení.** Rovnici $\sin 2x = \sin x$ přepiš jako $2\sin x\cos x - \sin x = 0$ a vytkni: $\sin x(2\cos x - 1) = 0$. Pak řeš oba činitele zvlášť.
3. **Sjednocení na jednu funkci.** Rovnici $2\cos^2 x + \sin x = 2$ převeď přes $\cos^2 x = 1 - \sin^2 x$ na rovnici jen pro $\sin x$.
4. **Umocnění se zkouškou.** Po umocnění obou stran rovnice vždy dosaď kořeny do původní rovnice — umocnění přidává falešné kořeny (mění znaménkové podmínky).
5. **Podmínky u tg a cotg.** Rovnice s $\tan x$ automaticky vyžaduje $x$ různé od $\pi/2 + k\pi$; nalezené kořeny s podmínkou porovnej.

> [!POZOR] Nikdy neděl rovnici výrazem s neznámou (např. $\sin x$) bez rozboru. Dělením ztratíš všechna řešení, kde je dělitel nulový. Správně: převeď na jednu stranu a vytýkej.

Vytýkání v praxi: rovnice $\sin x(\sin x - 1/2) = 0$ se rozpadne na $\sin x = 0$ (řešení $x = k\pi$) a $\sin x = 1/2$ (řešení $x = \pi/6 + 2k\pi$ nebo $x = 5\pi/6 + 2k\pi$). Součin je nulový právě když je nulový aspoň jeden činitel.

## Goniometrické nerovnice

Nerovnici $\sin x > a$ řeš na jednotkové kružnici: najdi úhly, kde $\sin x = a$ (hranice), a vyber oblouk, kde je sinus nad hranicí. Např. $\sin x > 1/2$ na $\langle 0, 2\pi\rangle$ má hranice $\pi/6$ a $5\pi/6$ a řešení:

$$
x \in \left(\dfrac{\pi}{6};\, \dfrac{5\pi}{6}\right)
$$

otevřený interval, protože nerovnice je ostrá.

> [!POZOR] U nerovnic hlídej tři věci:
>
> - ostrá vs. neostrá nerovnice (otevřený vs. uzavřený kraj),
> - správný oblouk (sinus je nad hranicí mezi dvěma průsečíky),
> - omezení intervalu ze zadání (např. jen $\langle 0, 2\pi\rangle$).

Pro $\cos x \le a$ je postup stejný s kosinem. Nerovnice s tangens vyžadují rozbor po intervalech spojitosti (tangens má v každém intervalu $(\pi/2 + k\pi, \pi/2 + (k+1)\pi)$ jiný průběh).

## Definiční obory s goniometrickými funkcemi

Dva typické mechanismy:

1. **Jmenovatel nesmí být nula.** U $y = (\sin 2x)/(2\sin x)$ je podmínka $\sin x$ ≠ $0$, tedy $x$ různé od $k\pi$.
2. **Odmocnina vyžaduje nezápornost.** U $y = \sqrt{\sin x}$ je podmínka $\sin x \ge 0$, tedy $x \in \bigcup_k \langle 2k\pi, \pi + 2k\pi\rangle$.

> [!POZOR] Zjednodušení definiční obor nerozšiřuje. Výraz $(\sin 2x)/(2\sin x)$ se sice rovná $\cos x$ všude, kde je definován, ale body $x = k\pi$ zůstávají z definičního oboru vyňaty. SCIO tuto nástrahu dává opakovaně.

## Trigonometrie trojúhelníku

Pro obecný trojúhelník se stranami $a, b, c$ a protilehlými úhly $\alpha, \beta, \gamma$ platí dvě věty.

> [!VETA] Sinová věta — poměr stran se rovná poměru sinů protilehlých úhlů:
>
> $$
> \dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma}
> $$

> [!VETA] Kosinová věta (pro $\gamma = 90°$ přechází v Pythagorovu větu):
>
> $$
> c^2 = a^2 + b^2 - 2ab\cos\gamma
> $$
>
> a cyklicky pro ostatní strany.

Obsah trojúhelníku ze dvou stran a sevřeného úhlu:

$$
S = \dfrac{1}{2}ab\sin\gamma
$$

### Nejednoznačnost (sinus neurčuje úhel jednoznačně)

Platí:

$$
\sin\gamma = \sin(180° - \gamma)
$$

Určíš-li ze sinové věty nebo z obsahu, že $\sin\gamma = 1/2$, jsou možné dva úhly: $30°$ i $150°$. Obě varianty musíš dosadit a ověřit (součet úhlů trojúhelníku je $180°$).

> [!POZOR] U úloh typu „strana–strana–úhel“ (SSA) nebo „obsah ze dvou stran“ vždy vyšetři obě větve. Jedna z nich často vypadne na součtu úhlů — ale ne vždy, někdy existují dva různé trojúhelníky a správná odpověď zahrnuje oba.

## Typové úlohy SCIO ke goniometrii

- **Znaménka a kvadranty.** Kde je daný výraz kladný/záporný; průnik podmínek pro více funkcí. Nástroj: tabulka znamének + jednotková kružnice.
- **Definiční obor se skrytým zúžením.** Výraz po zjednodušení vypadá nevinně (kosinus, konstanta), ale původní jmenovatel vylučuje body. Nástroj: podmínku piš vždy z původního tvaru.
- **Rovnice se ztrátou řešení.** Dělení výrazem s neznámou, zapomenutá větev u $\sin x = a$, kořeny $t$ mimo $\langle -1, 1\rangle$. Nástroj: vytýkat, ne dělit; každé $t$ zkontrolovat.
- **Rovnice s maximem.** Typ $\sqrt{3}\sin x + \cos x = 2$: levá strana má maximum právě 2, rovnice platí jen v bodech maxima. Nástroj: kondenzace na $A\sin(x + \varphi)$, pak jediná rodina řešení.
- **Chytré úpravy.** $(\sin x + \cos x)^2 = 1 + \sin 2x$, rozpoznání $\sin 2x$ ve výrazu $2\sin x\cos x$, krácení $(1 + \cos x)$. Nástroj: místo počítání hledej vzorec.
- **Obor hodnot součtu.** $\sin x + k\cos x$: nikdy nesčítat maxima, vždy kondenzace (nebo odhad přes maximum $\sqrt{1+k^2}$).
- **Porovnání hodnot v radiánech.** Převeď úhly do $\langle 0, \pi/2\rangle$ přes $\sin(\pi - x) = \sin x$ a porovnej na monotonii. Pamatuj $\pi/2 \approx 1{,}57$ a $\pi \approx 3{,}14$.
- **Sinová/kosinová věta a obsah.** Přímé dosazení + diskuze nejednoznačnosti u SSA a u obsahu.

## Řešené příklady

### Příklad 1

**Zadání:** Vypočtěte $\cos^2 15° - \sin^2 15°$.

**Řešení:**

1. Jednotlivé hodnoty $\cos 15°$ a $\sin 15°$ jsou odmocninové výrazy — místo jejich umocňování rozpoznáme vzorec $\cos 2x = \cos^2 x - \sin^2 x$ s $x = 15°$.
2. Dosadíme:

   $$
   \cos^2 15° - \sin^2 15° = \cos 30° = \dfrac{\sqrt{3}}{2}
   $$

### Příklad 2

**Zadání:** Řešte $\cos 2x = \cos x$.

**Řešení:**

1. Levou stranu rozepíšeme jako $2\cos^2 x - 1$ (volíme tvar s kosinem, aby rovnice obsahovala jedinou funkci):

   $$
   2\cos^2 x - \cos x - 1 = 0
   $$

2. Substituce $t = \cos x$ dá $t = 1$ nebo $t = -1/2$.
3. Z $t = 1$: $x = 2k\pi$. Z $t = -1/2$: $x = \pm 2\pi/3 + 2k\pi$. Obě rodiny jsou řešením; chyba by byla zahodit $t = 1$ jako „triviální“.

### Příklad 3

**Zadání:** Najděte maximum funkce $y = \sin x - \cos x$.

**Řešení:**

1. Součet ani rozdíl se nedá maximalizovat člen po členu — kondenzace:

   $$
   \sin x - \cos x = \sqrt{2}\sin\left(x - \dfrac{\pi}{4}\right)
   $$

2. Maximum sinu je $1$, takže maximum funkce je $\sqrt{2}$; nastává pro $x = 3\pi/4 + 2k\pi$.

### Příklad 4

**Zadání:** Kolik trojúhelníků existuje se stranami $a = 10$, $b = 12$ a úhlem $\alpha = 30°$?

**Řešení:**

1. Ze sinové věty:

   $$
   \sin\beta = \dfrac{12 \cdot \sin 30°}{10} = 0{,}6
   $$

2. Možnosti: $\beta_1 \approx 36{,}9°$ a $\beta_2 \approx 143{,}1°$.
3. Kontrola součtu: $30° + 143{,}1° = 173{,}1° < 180°$ — i tupoúhlá varianta existuje. Existují tedy dva různé trojúhelníky. (Kdyby součet přesáhl $180°$, druhá varianta by odpadla.)

## Shrnutí vzorců

- $\sin^2 x + \cos^2 x = 1$
- $\tan x = \sin x / \cos x$, $\cot x = \cos x / \sin x$
- Sinus součtu:

  $$
  \sin(x \pm y) = \sin x\cos y \pm \cos x\sin y
  $$

- Kosinus součtu:

  $$
  \cos(x \pm y) = \cos x\cos y \mp \sin x\sin y
  $$

- $\sin 2x = 2\sin x\cos x$
- Dvojnásobný úhel pro kosinus:

  $$
  \cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x
  $$
- $(\sin x \pm \cos x)^2 = 1 \pm \sin 2x$
- maximum $a\sin x + b\cos x$ je $\sqrt{a^2+b^2}$
- perioda $a\sin(bx+c)$ je $2\pi/|b|$, perioda $a\tan(bx+c)$ je $\pi/|b|$
- $\sin(\pi - x) = \sin x$, $\cos(\pi - x) = -\cos x$
- $\sin(x+\pi) = -\sin x$, $\cos(x+\pi) = -\cos x$
- sinová věta: $a/\sin\alpha = b/\sin\beta = c/\sin\gamma$
- kosinová věta: $c^2 = a^2 + b^2 - 2ab\cos\gamma$
- obsah: $S = ab\sin\gamma/2$
