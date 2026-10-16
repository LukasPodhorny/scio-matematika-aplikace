# Základní poznatky

Základy drží celou matematiku: číselné obory a práce s nimi, dělitelnost, procenta, množiny a logika. Ve SCIO tvoří tahle látka podstatnou část testu — úlohy jsou krátké, ale trestají každou nepozornost se znaménkem, závorkou nebo základem procent.

## Číselné obory

Obory do sebe zapadají: přirozená čísla $\mathbb{N}$, celá čísla $\mathbb{Z}$, racionální čísla $\mathbb{Q}$ a reálná čísla $\mathbb{R}$.

$$
\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}
$$

Přirozená čísla jsou $1, 2, 3, \dots$ Celá přidávají nulu a záporná čísla. Racionální je každé číslo tvaru $p/q$, kde $p$ a $q$ jsou celá a $q$ je různé od nuly. Iracionální čísla (např. $\sqrt{2}$, $\pi$) se zapsat zlomkem nedají.

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

> [!POZOR] Odmocniny se nesčítají pod odmocnítkem: $\sqrt{50} - \sqrt{32}$ není $\sqrt{18}$ jako mezikrok k sečtení. Nejdřív rozlož na stejný základ ($5\sqrt{2} - 4\sqrt{2}$), pak pracuj s koeficienty.

Absolutní hodnota měří vzdálenost od nuly:

$$
|a| = a \quad (a \ge 0), \qquad |a| = -a \quad (a < 0)
$$

Proto $|2 - \sqrt{5}| = \sqrt{5} - 2$, protože $2 - \sqrt{5}$ je záporné.

> [!POZOR] Minus před mocninou se bez závorek neumocňuje: $-3^2 = -9$, ale $(-3)^2 = 9$. Stejně tak $(-2)^3 = -8$.

## Dělitelnost, NSD a NSN

Číslo $a$ je dělitelné číslem $b$, když $a/b$ vyjde beze zbytku. Znaky dělitelnosti ušetří dělení:

| Dělitel | Znak |
|---|---|
| 2 | poslední číslice sudá |
| 3 | ciferný součet dělitelný 3 |
| 4 | poslední dvojčíslí dělitelné 4 |
| 5 | končí na 0 nebo 5 |
| 6 | dělitelné 2 i 3 zároveň |
| 9 | ciferný součet dělitelný 9 |
| 10 | končí na 0 |

Prvočíslo má právě dva dělitele ($2, 3, 5, 7, 11, \dots$). Každé složené číslo se rozloží na prvočísla:

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

## Procenta a trojčlenka

Procento je setina základu: $1\% = 1/100$. Část ze základu:

$$
\dfrac{15}{100} \cdot 200 = 30
$$

U procentních úloh vždy urči základ (celek, ze kterého se počítá). Jiný základ dá jiné procento: $120/160 = 75\%$ je úspěšnost dostavených, $120/200 = 60\%$ je úspěšnost všech přihlášených.

> [!VETA] Opakované procentní změny se násobí jako koeficienty, nikdy nesčítají. Zdražení o 20 % a pak sleva 20 % dává:
>
> $$
> 1{,}2 \cdot 0{,}8 = 0{,}96
> $$
>
> tedy o 4 % méně než původní cena.

Pozor na procentní body: růst z 20 % na 25 % je nárůst o 5 procentních bodů, což je relativně o čtvrtinu ($5/20 = 1/4$).

Trojčlenka řeší úměry. Přímá úměra (více kusů — vyšší cena):

$$
\dfrac{7 \cdot 120}{4} = 210
$$

Nepřímá úměra (více dělníků — kratší čas): celkový objem práce $6 \cdot 15 = 90$ člověkodní se dělí novým počtem dní.

Společná práce sčítá rychlosti, ne časy:

$$
\dfrac{1}{6} + \dfrac{1}{4} = \dfrac{5}{12}, \qquad \dfrac{12}{5} = 2{,}4
$$

tedy 2 hodiny 24 minut.

> [!POZOR] Časy dvou přítoků se nepočítají průměrem: $(6 + 4)/2 = 5$ hodin je špatně. Sčítají se objemy za hodinu ($1/6 + 1/4$), čas je převrácená hodnota součtu.

U směsí se mění i celek: přidáš-li $x$ gramů soli do 200 gramů roztoku, je nový celek $200 + x$, ne 200.

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

Výrok je tvrzení, které je buď pravdivé, nebo nepravdivé. Složené výroky staví spojky:

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

Kvantifikátory „pro všechna“ ($\forall$) a „existuje“ ($\exists$) se při negaci mění jeden v druhý a vlastnost se neguje:

$$
\lnot(\forall x: V(x)) \equiv \exists x: \lnot V(x)
$$

Negace „všichni prospěli“ je tedy „aspoň jeden neprospěl“. U nerovností negace otáčí i rovnost: negace $n > 5$ je $n \le 5$ (pětka původnímu výroku nevyhovuje, takže negaci vyhovovat musí).

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
