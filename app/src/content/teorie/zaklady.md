# Základní poznatky

Základy drží celou matematiku: číselné obory a práce s nimi, dělitelnost, procenta, množiny a logika. Při řešení hlídej především znaménka, závorky, podmínky výrazů a základ procent. Následující výklad propojuje pravidla s postupy, které využiješ při procvičování.

## Číselné obory

Obory do sebe zapadají: přirozená čísla $\mathbb{N}$, celá čísla $\mathbb{Z}$, racionální čísla $\mathbb{Q}$ a reálná čísla $\mathbb{R}$.

$$
\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}
$$

V této aplikaci používáme $\mathbb{N} = \{1, 2, 3, \dots\}$; nulu přidáváme výslovně zápisem $\mathbb{N}_0$. Celá přidávají nulu a záporná čísla. Racionální je každé číslo tvaru $p/q$, kde $p$ a $q$ jsou celá a $q$ je různé od nuly. Iracionální čísla (např. $\sqrt{2}$, $\pi$) se zapsat zlomkem nedají.

> [!VETA] Racionální číslo má ukončený nebo periodický desetinný rozvoj — $1/4 = 0{,}25$, $1/3 = 0{,}333\dots$ A naopak: každý takový rozvoj patří racionálnímu číslu.
>
> Periodu převedeš na zlomek odečtením (pro periodu délky 2 násob stem):
>
> $$
> x = 0{,}2424\dots
> $$
>
> $$
> 100x = 24{,}2424\dots
> $$
>
> $$
> 99x = 24, \quad x = 24/99 = 8/33
> $$

Odmocnina sama o iracionalitě nerozhoduje: $\sqrt{9} = 3$ je racionální, $\sqrt{6}$ je iracionální. Počítej podle pravidel:

$$
\sqrt{ab} = \sqrt{a}\sqrt{b} \qquad (a, b \ge 0)
$$

$$
\sqrt{50} = 5\sqrt{2}, \quad \sqrt{32} = 4\sqrt{2}, \quad \sqrt{8} = 2\sqrt{2}
$$

> [!POZOR] Odmocniny se nesčítají pod odmocnítkem: $\sqrt{50} - \sqrt{32}$ není $\sqrt{18}$. Nejdřív rozlož na stejný základ ($5\sqrt{2} - 4\sqrt{2}$), pak pracuj s koeficienty.

Absolutní hodnota měří vzdálenost od nuly:

$$
|a| = a \quad (a \ge 0), \qquad |a| = -a \quad (a < 0)
$$

Proto $|2 - \sqrt{5}| = \sqrt{5} - 2$, protože $2 - \sqrt{5}$ je záporné.

> [!POZOR] Minus před mocninou se bez závorek neumocňuje: $-3^2 = -9$, ale $(-3)^2 = 9$. Stejně tak $(-2)^3 = -8$.

## Dělitelnost, NSD a NSN

Pro celá čísla $a$, $b$, kde $b$ ≠ 0, říkáme, že $a$ je dělitelné číslem $b$, pokud $a/b$ je celé číslo. Znaky dělitelnosti ušetří dělení:

| Dělitel | Znak |
|---|---|
| 2 | poslední číslice sudá |
| 3 | ciferný součet dělitelný 3 |
| 4 | poslední dvojčíslí dělitelné 4 |
| 5 | končí na 0 nebo 5 |
| 6 | dělitelné 2 i 3 zároveň |
| 8 | poslední trojčíslí dělitelné 8 |
| 9 | ciferný součet dělitelný 9 |
| 10 | končí na 0 |
| 12 | dělitelné 3 i 4 zároveň |

Nula je sudá: $0 = 2 \cdot 0$. Pravidlo pro 4 stačí ověřit na posledním dvojčíslí, protože zbytek čísla je násobek 100, a tedy i 4. Podobně pro 8 stačí trojčíslí, protože 1000 je dělitelné 8.

Prvočíslo je přirozené číslo větší než 1, které má právě dva kladné dělitele: 1 a sebe samo (např. $2, 3, 5, 7, 11$). Jednička není prvočíslo ani složené číslo; 2 je jediné sudé prvočíslo. Každé složené přirozené číslo se rozloží na prvočísla:

$$
84 = 2^2 \cdot 3 \cdot 7, \qquad 126 = 2 \cdot 3^2 \cdot 7
$$

> [!VETA] Největší společný dělitel (NSD) bere z každého prvočísla menší exponent:
>
> $$
> 2 \cdot 3 \cdot 7 = 42
> $$
>
> Nejmenší společný násobek (NSN) bere větší exponent:
>
> $$
> 2^2 \cdot 3^2 \cdot 7 = 252
> $$

Volba NSD nebo NSN plyne ze zadání: dělíš-li celek na stejné díly (čtverce z obdélníku), hledáš dělitele (NSD). Opakuje-li se něco v cyklech (odjezdy linek), hledáš násobek (NSN).

> [!POZOR] Nejčastější prohození: u NSD menší exponenty, u NSN větší. Kdo vezme větší exponenty u dělitele, dostane násobek — a naopak.

### Zbytky po dělení

Při dělení nezáporného celého čísla $a$ kladným celým číslem $d$ píšeme:

$$
a = dq + r, \qquad 0 \le r < d
$$

$q$ je celočíselný podíl a $r$ zbytek. Například $58 = 7 \cdot 8 + 2$. Zbytek musí být menší než dělitel.

- Mají-li dvě čísla při dělení stejným $d$ zbytek $r$, pak $d$ dělí obě čísla po odečtení $r$ i jejich rozdíl. Navíc musí být $d > r$.
- Zbytek výrazu zjistíš dosazením: pokud $k = 7q + 4$, pak $3k + 2 = 21q + 14$, takže je výraz dělitelný 7.
- U mocnin hledej opakování zbytků. Například $3^2$ dává po dělení 8 zbytek 1; každá sudá mocnina trojky proto dává zbytek 1.
- U rozdílu $n^2-n$ nejprve vytkni: $n(n-1)$. Součin sousedních celých čísel je vždy sudý; jiné dělitele ověř zvlášť.

> [!POZOR] Dělitelnost dvěma a čtyřmi nezaručuje dělitelnost osmi (např. 12). Dělitelnost dvěma nesoudělnými čísly zaručuje dělitelnost jejich součinem; obecně zaručuje dělitelnost jejich NSN.

## Mocniny, odmocniny a zlomky

### Pravidla mocnin a jejich podmínky

V zápisu $a^n$ je $a$ základ a $n$ exponent. Pro kladné celé $n$ násobíme $n$ stejných činitelů $a$. Pro celočíselné exponenty používáme:

$$
a^m \cdot a^n = a^{m+n}, \qquad \frac{a^m}{a^n} = a^{m-n}
$$

$$
(a^m)^n = a^{mn}, \qquad (ab)^n = a^n b^n
$$

$$
\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}
$$

U podílů musí být jmenovatel nenulový. Nulový nebo záporný exponent vyžaduje nenulový základ:

$$
a^0 = 1, \qquad a^{-n} = \frac{1}{a^n}
$$

První pravidlo lze pochopit z $a^2/a^2 = a^{2-2} = 1$. Záporný exponent znamená převrácenou hodnotu, nikoli záporný výsledek: $4^{-2} = 1/16$. Výraz $0^0$ zde nedefinujeme.

**Porovnávání:** převeď mocniny na stejný kladný základ. Pro základ větší než 1 je větší mocnina s větším exponentem; pro základ mezi 0 a 1 je pořadí opačné. Například $16^3 = 2^{12} < 2^{13}$, ale $(1/4)^3 < (1/4)^2$. U záporného základu nejprve rozhodni znaménko podle sudosti exponentu.

### Odmocniny a algebraické vzorce

Druhá odmocnina $\sqrt{a}$ je nezáporné číslo, jehož druhá mocnina je $a$. V reálných číslech vyžaduje $a \ge 0$. Sudá odmocnina ze záporného čísla neexistuje, lichá ano: $\sqrt[3]{-64} = -4$.

> [!POZOR] Platí $\sqrt{a^2} = |a|$, nikoli vždy $a$. Například $\sqrt{(-6)^2} = 6$. Výraz $\sqrt{36}$ má jedinou hodnotu 6; rovnice $x^2 = 36$ má dvě řešení, 6 a −6.

Pro nezáporná $a,b$ platí pravidlo pro součin; pro podíl navíc $b > 0$:

$$
\sqrt{ab} = \sqrt{a}\sqrt{b}, \qquad
\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}
$$

Pro $a > 0$, celé $m$ a přirozené $n$ platí $a^{m/n} = \sqrt[n]{a^m}$. Například $27^{2/3} = 9$.

Často pomohou tři vzorce:

$$
(a+b)^2 = a^2+2ab+b^2
$$

$$
(a-b)^2 = a^2-2ab+b^2
$$

$$
a^2-b^2 = (a-b)(a+b)
$$

První vznikne roznásobením $(a+b)(a+b)$: dva prostřední členy jsou oba $ab$. Můžeš si také představit čtverec o straně $a+b$, rozdělený na dva čtverce a dva obdélníky.

Než roznásobíš závorku s odmocninami, zkus odmocniny zjednodušit. Při součinu výrazů s opačnými znaménky zase využij rozdíl čtverců.

> [!POZOR] Odmocnina se nerozděluje přes součet ani rozdíl. Také $(a+b)^2$ obecně není $a^2+b^2$ — chybí člen $2ab$.

### Počítání se zlomky a usměrnění

Zlomek $p/q$ vyjadřuje dělení, proto $q$ ≠ 0. Krácení a rozšiřování dělí či násobí **celého čitatele i celého jmenovatele** stejným nenulovým číslem; hodnota zůstává stejná. V základním tvaru jsou čitatel a jmenovatel nesoudělné.

- Sčítání a odčítání: nejprve společný jmenovatel, potom sečíst či odečíst čitatele.
- Násobení: čitatel krát čitatel, jmenovatel krát jmenovatel; krátit lze už před násobením.
- Dělení: násobit převráceným druhým zlomkem. Dělící zlomek nesmí být nula.

$$
\frac{3}{4}-\frac{1}{6}=\frac{9-2}{12}=\frac{7}{12}
$$

$$
\frac{3}{4}:\frac{5}{8}=\frac{3}{4}\cdot\frac{8}{5}=\frac{6}{5}
$$

> [!POZOR] Krátit lze společné **činitele**, nikoli jednotlivé sčítance. Například $(x+2)/x$ nelze zkrátit na 2. Nejprve případně vytkni společný činitel.

**Dlouhé součiny** nenásob do velkých čísel. Páruj činitele čitatele a jmenovatele nebo rozlož čísla na prvočísla. Například každý z pěti poměrů v následujícím výrazu je roven 3:

$$
\frac{3\cdot6\cdot9\cdot12\cdot15}{1\cdot2\cdot3\cdot4\cdot5}=3^5
$$

**Usměrnění** odstraní odmocninu ze jmenovatele vhodným rozšířením. U jediného členu násob odmocninou; u dvojčlenu použij sdružený výraz s opačným znaménkem:

$$
\frac{2}{\sqrt{7}}=\frac{2\sqrt{7}}{7}
$$

$$
\frac{1}{\sqrt{6}+1}
=\frac{\sqrt{6}-1}{(\sqrt{6}+1)(\sqrt{6}-1)}
=\frac{\sqrt{6}-1}{5}
$$

## Poměry, procenta a zaokrouhlování

### Poměry a spojování poměrů

Poměr $a:b$ vyjadřuje relativní velikosti. U veličin stejného druhu nejdřív sjednoť jednotky: 75 cm ku 1,5 m je $75:150 = 1:2$. Ze samotného poměru nezjistíš absolutní množství.

Při dělení celku v poměru $3:5$ má celek 8 dílů. Z 640 Kč připadá na první část $640 \cdot 3/8 = 240$ Kč, na druhou 400 Kč.

**Dva navazující poměry** spoj přes společnou veličinu. Jestliže $A:B = 3:4$ a $B:C = 6:5$, uprav oba poměry tak, aby $B$ mělo stejný počet dílů:

$$
A:B = 9:12, \qquad B:C = 12:10
$$

Tedy $A:B:C = 9:12:10$ a $A:C = 9:10$. Prosté opsání $3:4:5$ by nedodrželo druhý poměr.

### Procenta a volba základu

Procento je setina základu: $1\% = 1/100$. Část ze základu:

$$
\dfrac{15}{100} \cdot 200 = 30
$$

Označme základ $z$, část $c$ a počet procent $p$:

$$
c = z\frac{p}{100}, \qquad
p = \frac{c}{z}\cdot100, \qquad
z = \frac{100c}{p}
$$

Při dělení musí být $z$, respektive $p$, nenulové. Například 36 je 15 % ze základu $36/0{,}15 = 240$. Pokud se k procentní změně přidá pevná částka, nejdřív vyčísli celkový rozdíl a až potom jej vyděl původním základem.

U procentních úloh vždy urči základ (celek, ze kterého se počítá). Jiný základ dá jiné procento: $120/160 = 75\%$ je úspěšnost dostavených, $120/200 = 60\%$ je úspěšnost všech přihlášených.

> [!VETA] Opakované procentní změny se násobí jako koeficienty, nikdy nesčítají. Zdražení o 20 % a pak sleva 20 % dává:
>
> $$
> 1{,}2 \cdot 0{,}8 = 0{,}96
> $$
>
> tedy o 4 % méně než původní cena.

Pozor na procentní body: růst z 20 % na 25 % je nárůst o 5 procentních bodů, což je relativně o čtvrtinu ($5/20 = 1/4$).

### Přímá a nepřímá úměra

Trojčlenka dopočítává čtvrtý údaj ze tří známých, pokud veličiny tvoří úměru.

**Přímá úměra:** poměr $y/x$ je stálý. Jestliže 4 stejné sešity stojí 120 Kč, jeden stojí 30 Kč a 7 sešitů stojí $7 \cdot 30 = 210$ Kč.

**Nepřímá úměra:** součin $xy$ je stálý. Jestliže 6 stejně výkonných dělníků zvládne práci za 15 dní, práce vyžaduje $6 \cdot 15 = 90$ člověkodní. Pro dokončení za 10 dní potřebujeme $90/10 = 9$ dělníků.

> [!POZOR] Samotné „více — více“ ještě nezaručuje přímou úměru. Cena dopravy s pevným nástupním poplatkem neroste přímo úměrně vzdálenosti. U pracovníků předpokládáme stejný stálý výkon a práci, kterou lze mezi ně rozdělit.

Společná práce sčítá rychlosti, ne časy:

$$
\dfrac{1}{6} + \dfrac{1}{4} = \dfrac{5}{12}, \qquad \dfrac{12}{5} = 2{,}4
$$

tedy 2 hodiny 24 minut.

> [!POZOR] Časy dvou přítoků se nepočítají průměrem: $(6 + 4)/2 = 5$ hodin je špatně. Sčítají se objemy za hodinu ($1/6 + 1/4$), čas je převrácená hodnota součtu.

U směsí se mění i celek: přidáš-li $x$ gramů soli do 200 gramů roztoku, je nový celek $200 + x$, ne 200.

### Zaokrouhlování bez mezikroků

Při zaokrouhlení kladného čísla sleduj číslici bezprostředně napravo od požadovaného řádu. U 0–4 ponech zaokrouhlovanou číslici, u 5–9 ji zvětši o 1; následující místa nahraď nulami nebo vypusť za desetinnou čárkou.

Například 7 263 zaokrouhlené na desítky je 7 260, na stovky 7 300. Číslo 4,375 na setiny zaokrouhlíme na 4,38. Při přenosu může vzniknout nový řád: 9,98 na desetiny je 10,0.

> [!POZOR] Zaokrouhluj přímo na požadovaný řád. Číslo 6,249 na desetiny dává 6,2; přes mezikrok 6,25 by chybně vyšlo 6,3. Přesnou hodnotu ponech až do konce výpočtu.

Při obvyklém školním zaokrouhlování kladných čísel odpovídá výsledku 700 na stovky interval od 650 včetně do 750 bez tohoto krajního bodu. Hraniční pětka rozhoduje směrem nahoru.

## Množiny a intervaly

Množina je soubor prvků, prvek zapisujeme $a \in A$. Podmnožina $B \subset A$ obsahuje jen prvky z $A$. Základní operace:

- průnik $A \cap B$ — prvky společné oběma množinám,
- sjednocení $A \cup B$ — prvky aspoň v jedné z nich,
- rozdíl $A \setminus B$ — prvky z $A$, které nejsou v $B$.

Prvky v průniku se při sčítání započítají dvakrát, proto se jednou odečítají (princip inkluze a exkluze):

$$
|A \cup B| = |A| + |B| - |A \cap B|
$$

Příklad: $18 + 15 - 7 = 26$ žáků má rádo aspoň jeden předmět. Vennův diagram donutí odečíst průnik právě jednou.

U Vennova diagramu rozlišuj tři oddělené oblasti: **pouze A**, **obojí**, **pouze B**. Celý počet v A zahrnuje i průnik.

$$
\textstyle |A\setminus B|=|A|-|A\cap B|
$$

Počet s právě jednou vlastností je součet obou oblastí mimo průnik:

$$
|A|+|B|-2|A\cap B|
$$

Když znáš jen sjednocení, průnik a rozdíl velikostí množin, označ jednu celkovou velikost $x$, druhou $x+d$. Potom:

$$
x+(x+d)-|A\cap B|=|A\cup B|
$$

Počet lidí mimo obě množiny zjistíš odečtením sjednocení od celkového počtu. Samotná velikost skupiny nemusí být pro otázku na jednu množinu potřebná.

Intervaly na číselné ose:

| Zápis | Význam |
|---|---|
| $\langle 2, 5 \rangle$ | $2 \le x \le 5$ |
| $(2, 5)$ | $2 < x < 5$ |
| $\langle 2, 5)$ | $2 \le x < 5$ |
| $(2, 5\rangle$ | $2 < x \le 5$ |

Ostrá závorka bod zahrnuje, kulatá ho vylučuje. Průnik intervalů jde od větší levé meze k menší pravé mezi; krajní bod patří do průniku jen tehdy, patří-li do obou intervalů.

> [!POZOR] U intervalu $(3, 5\rangle$ bod 3 nepatří a bod 5 patří. Nejčastější chyba: opsat závorky od oka. Každý kraj ověř zvlášť otázkou „patří tento bod do obou množin?“.

Absolutní hodnota popisuje vzdálenost od bodu: $|x - 3| < 5$ znamená „do 5 od trojky“:

$$
|x - 3| < 5 \iff -2 < x < 8
$$

Ostrá nerovnice dává otevřený interval $(-2, 8)$.

## Výroková logika

Výrok je tvrzení, které je buď pravdivé, nebo nepravdivé. Otázka ani příkaz výrokem nejsou. Otevřený zápis $x > 3$ potřebuje dosazení nebo kvantifikátor, abychom mohli posoudit jeho pravdivost. Složené výroky staví spojky:

| Spojka | Značí se | Pravdivá když |
|---|---|---|
| negace | $\lnot p$ | $p$ neplatí |
| konjunkce (a) | $p \land q$ | platí obě části |
| disjunkce (nebo) | $p \lor q$ | platí aspoň jedna část |
| implikace | $p \Rightarrow q$ | neplatí $p$ bez $q$ |
| ekvivalence | $p \Leftrightarrow q$ | obě části stejně |

Implikace „jestliže $p$, pak $q$“ je nepravdivá jen v jediném případě: $p$ platí a $q$ neplatí. S nepravdivým předpokladem je vždy pravdivá.

> [!VETA] Negace implikace je konjunkce — předpoklad platí a závěr neplatí:
>
> $$
> \lnot(p \Rightarrow q) \equiv p \land \lnot q
> $$
>
> Negace „jestliže prší, zůstanu doma“ je „prší a nezůstanu doma“.

### Pravdivostní tabulka a obměna implikace

Hodnota 1 znamená pravdu, 0 nepravdu. Pro dva výroky existují čtyři možnosti:

| $p$ | $q$ | $\lnot p$ | $p\land q$ | $p\lor q$ | $p\Rightarrow q$ | $p\Leftrightarrow q$ |
|---|---|---|---|---|---|---|
| 1 | 1 | 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 | 1 |

Matematické „nebo“ připouští i platnost obou částí. U složeného výrazu počítej mezisloupce od závorek a negací ke spojkám.

**Obrácená implikace** $q \Rightarrow p$ nemusí říkat totéž co původní. **Obměněná implikace** však má vždy stejnou pravdivostní hodnotu:

$$
(p\Rightarrow q)\equiv(\lnot q\Rightarrow\lnot p)
$$

Například „jestliže je číslo dělitelné 14, je sudé“ lze obměnit na „jestliže číslo není sudé, není dělitelné 14“. Obrácená věta „každé sudé číslo je dělitelné 14“ neplatí.

**Tautologie** je složený výrok pravdivý při všech ohodnoceních. Například $p\lor\lnot p$. Dva zápisy jsou logicky ekvivalentní, když se shodují v každém řádku tabulky; jediné shodné ohodnocení nestačí.

$$
(p\Rightarrow q)\equiv(\lnot p\lor q)
$$

### Negace kvantifikátorů a počtu

Kvantifikátory „pro všechna“ ($\forall$) a „existuje“ ($\exists$) se při negaci mění jeden v druhý a vlastnost se neguje:

$$
\lnot(\forall x: V(x)) \equiv \exists x: \lnot V(x)
$$

Negace „všichni prospěli“ je tedy „aspoň jeden neprospěl“. U nerovností negace otáčí i rovnost: negace $n > 5$ je $n \le 5$ (pětka původnímu výroku nevyhovuje, takže negaci vyhovovat musí).

Druhý směr negace kvantifikátorů:

$$
\lnot(\exists x: V(x))\equiv\forall x:\lnot V(x)
$$

„Existuje vyhovující prvek“ tedy negujeme „žádný prvek nevyhovuje“. U počtu prvků (celého nezáporného čísla) platí:

- „alespoň $n$“ negujeme „nejvýše $n-1$“ (pro $n \ge 1$),
- „nejvýše $n$“ negujeme „alespoň $n+1$“,
- „právě $n$“ negujeme „méně než $n$ nebo více než $n$“.

Negace „alespoň 8“ je „nejvýše 7“, nikoli „právě 7“. U reálných veličin ponech nerovnost: negace $x \ge 8$ je $x < 8$, nikoli $x \le 7$.

De Morganova pravidla negují obě části a vymění spojku:

$$
\lnot(p\land q)\equiv\lnot p\lor\lnot q
$$

$$
\lnot(p\lor q)\equiv\lnot p\land\lnot q
$$

> [!POZOR] Tvar „neprší nebo zůstanu doma“ není negací implikace, ale jejím ekvivalentem. Negace implikace je vždy konjunkce (slovo „a“), nikdy disjunkce.

Úlohy typu „právě jedno z tvrzení platí“ řeš ověřením všech tvrzení u každé možnosti — tabulka poctivě vyplněná pro všechna čísla.

## Typové úlohy SCIO k základům

- **Zařazení do oboru.** Je dané číslo přirozené, celé, racionální, iracionální? Nástroj: dopočítej výraz (odmocniny, mocniny) a pak teprve zařazuj.
- **Porovnání zlomků.** Křížové násobení po dvojicích nebo desetinný odhad. Nástroj: $a/b > c/d$ právě když $ad > bc$ (u kladných čísel).
- **Absolutní hodnota s odmocninou.** Nejdřív znaménko výrazu uvnitř, pak teprve odstraň závorky. Nástroj: odhad $\sqrt{5} \approx 2{,}24$.
- **NSD vs. NSN.** Rozklad na prvočísla; dělitel menší exponenty, násobek větší. Nástroj: kontrola dělením u každé možnosti.
- **Ciferné doplňovačky.** Znaky dělitelnosti + systematický průchod číslic 0 až 9. Nástroj: dělitelnost 6 znamená 2 i 3 zároveň.
- **Opakovaná procenta.** Násobení koeficientů, hlídání základu u každé změny. Nástroj: $1{,}2 \cdot 0{,}8 = 0{,}96$.
- **Trojčlenka a společná práce.** Rozpoznat přímou vs. nepřímou úměru; u přítoků sčítat rychlosti. Nástroj: kontrola směru („vyjde víc než původně?“).
- **Venn a intervaly.** Inkluze a exkluze u slovních úloh; u intervalů ověřit každý kraj zvlášť. Nástroj: obrázek číselné osy.
- **Poměry a zaokrouhlování.** U spojování poměrů sjednoť společnou veličinu; u zaokrouhlení hlídej požadovaný řád a hraniční pětku.
- **Mocniny, odmocniny a zlomky.** Sjednoť základy mocnin, rozlož činitele a krátit začni před násobením. Všímej si rozdílu čtverců a podmínek odmocnin.
- **Zbytky a dělitelnost výrazů.** Zapiš číslo jako násobek dělitele plus zbytek; před velkými výpočty zkus vytknout společný činitel.
- **Negace a implikace.** Negace mění kvantifikátor i vlastnost; negace implikace je konjunkce. Nástroj: pravdivostní tabulka pro sporné případy.

## Řešené příklady

### Příklad 1

**Zadání:** Bunda zdražila o 30 %, pak zlevnila o 30 %. O kolik procent se změnila cena?

**Řešení:**

1. Změny převedeme na koeficienty: zdražení $1{,}3$, sleva $0{,}7$. Násobíme, protože sleva se počítá už ze zdražené ceny:
2. Dosadíme:

   $$
   1{,}3 \cdot 0{,}7 = 0{,}91
   $$

3. Cena je 91 % původní, tedy o 9 % nižší. Chyba by byla změny odečíst ($30 - 30 = 0$).

### Příklad 2

**Zadání:** Tři stroje dokončí cyklus každých 6, 8 a 12 minut. Všechny právě dokončily společně. Za jak dlouho se sejdou znovu?

**Řešení:**

1. Opakování v cyklech znamená násobek — hledáme NSN. Rozklady: $6 = 2 \cdot 3$, $8 = 2^3$, $12 = 2^2 \cdot 3$.
2. Z každého prvočísla větší exponent:

   $$
   2^3 \cdot 3 = 24
   $$

3. Kontrola: 24 je dělitelné 6, 8 i 12. Menší společný násobek neexistuje — např. 12 není násobkem 8.

### Příklad 3

**Zadání:** Z 25 žáků umí anglicky 14, německy 12 a oba jazyky 5. Kolik žáků neumí ani jeden?

**Řešení:**

1. Aspoň jeden jazyk: sečteme a odečteme průnik (těch 5 je v obou číslech):

   $$
   14 + 12 - 5 = 21
   $$

2. Ani jeden: $25 - 21 = 4$. Chyba by byla odpovědět $14 - 5 = 9$ (to je počet s právě jedním jazykem, a to jen angličtinou).

### Příklad 4

**Zadání:** Utvoř negaci výroku „Každé sudé číslo je dělitelné čtyřmi.“ a rozhodni, zda je negace pravdivá.

**Řešení:**

1. „Každé“ se mění na „existuje“ a vlastnost se neguje: „Existuje sudé číslo nedělitelné čtyřmi.“
2. Hledáme protipříklad: $6$ je sudé a $6/4$ není celé číslo.
3. Negace je pravdivá, původní výrok nepravdivý. Chyba by byla negovat jen vlastnost („každé sudé je nedělitelné čtyřmi“ — to je silnější a nepravdivé tvrzení).

## Shrnutí vzorců

- Číselné obory:

  $$
  \mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}
  $$

- $p/q$ racionální právě pro periodický nebo ukončený rozvoj
- absolutní hodnota:

  $$
  |a| = a \quad (a \ge 0), \qquad |a| = -a \quad (a < 0)
  $$

- $\sqrt{ab} = \sqrt{a}\sqrt{b}$ pro $a, b \ge 0$
- NSD: menší exponenty; NSN: větší exponenty
- opakovaná procentní změna:

  $$
  1{,}2 \cdot 0{,}8 = 0{,}96
  $$

- $|A \cup B| = |A| + |B| - |A \cap B|$
- $|x - a| < r \iff a - r < x < a + r$
- $\lnot(p \Rightarrow q) \equiv p \land \lnot q$
- negace $\forall$ je $\exists$ s negovanou vlastností (a naopak)
- negace $n > 5$ je $n \le 5$
- $a^m a^n=a^{m+n}$, $(a^m)^n=a^{mn}$
- $a^{-n}=1/a^n$ pro $a$ ≠ 0
- $\sqrt{a^2}=|a|$
- $a^2-b^2=(a-b)(a+b)$
- dělení se zbytkem: $a=dq+r$, $0\le r<d$
- obměna implikace: $p\Rightarrow q$ je ekvivalentní $\lnot q\Rightarrow\lnot p$
