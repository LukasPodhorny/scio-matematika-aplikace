# Kombinatorika a statistika

Kombinatorika počítá možnosti: kolika způsoby lze vybrat, seřadit nebo rozdělit. Pravděpodobnost pak poměřuje příznivé možnosti všemi. Statistika naopak z naměřených dat vytahuje shrnující čísla — průměr, medián, rozptyl. Jednotka má čtyři podtémata: kombinatorická pravidla a skupiny, binomickou větu, pravděpodobnost a statistické charakteristiky.

## Kombinatorická pravidla

Všechno stojí na dvou pravidlech. Pravidlo součinu říká, že po sobě jdoucí nezávislé volby se násobí: máš-li 3 košile a 2 kalhoty, je $3 \cdot 2$ možných obleků. Pravidlo součtu říká, že disjunktní případy (které se navzájem vylučují) se sčítají: cestu autem zvládneš 2 způsoby a vlakem 3 způsoby, celkem $2 + 3$ způsoby.

> [!VETA] Pravidlo součinu: $m$ možností první volby krát $n$ možností druhé volby dává $m \cdot n$ dvojic. Pravidlo součtu: vylučující se případy s $m$ a $n$ možnostmi dávají $m + n$ možností.

Třetí trik je doplněk. Uvidíš-li slova aspoň jeden nebo alespoň jednou, je skoro vždy rychlejší odečíst opak: všechny možnosti bez hledané vlastnosti odečíst od všech možností. Počítat případy s právě jedním, právě dvěma a tak dále je zdlouhavé a snadno se na některý zapomene.

> [!POZOR] Sčítat pravděpodobnosti nebo počty lze jen u případů, které se vylučují. Hody kostkou nejsou disjunktní s hody mincí a „aspoň jednou šestka ve 3 hodech“ není $3 \cdot (1/6)$ — správně je doplněk $1 - (5/6)^3$.

## Variace, permutace a kombinace

Bez opakování jsou tři skupiny. Rozhodují dvě otázky: záleží na pořadí, a vybíráš všechny prvky, nebo jen některé?

| Skupina | Pořadí | Výběr | Počet |
|---|---|---|---|
| Permutace | ano | všechny | $P(n) = n!$ |
| Variace | ano | $k$ z $n$ | $V(n,k) = n!/(n-k)!$ |
| Kombinace | ne | $k$ z $n$ | $C(n,k) = \binom{n}{k}$ |

> [!VETA] Faktoriál $n! = 1 \cdot 2 \cdots n$ počítá pořadí $n$ prvků. Kombinační číslo:
>
> $$
> \binom{n}{k} = \dfrac{n!}{k!(n-k)!}
> $$
>
> čte se „$n$ nad $k$“ a počítá neuspořádané $k$-tice z $n$ prvků.

Proč se u kombinací dělí? Variací je $n!/(n-k)!$, ale každá vybraná $k$-tice se v nich vyskytuje ve všech $k!$ pořadích — a pořadí ignorujeme, takže jím vydělíme. Typické použití: dvojice týmů v turnaji, komise, tahy koulí z osudí.

Zvláštní případ je sezení kolem kulatého stolu: otočení celého pořádku se nerozlišuje, takže jednoho člověka fixujeme a zbytek řadíme. Možností je $(n-1)!$, ne $n!$.

## Kombinatorika s opakováním

S opakováním se ke každé skupině přidá varianta. Variace s opakováním: $k$-tice z $n$ prvků, každý se smí opakovat — počet je $n^k$. Typický příklad: PIN ze 4 číslic má $10^4$ možností, protože na každém místě je 10 cifer nezávisle.

Permutace s opakováním: řadíme $n$ věcí, ale některé jsou stejné (písmena slova se opakují). Počet je $n!$ děleno faktoriály četností každé skupiny:

$$
\dfrac{n!}{k_1! \, k_2! \cdots k_r!}
$$

Dělíme proto, že prohození dvou stejných písmen nové slovo nevytvoří — každé různé slovo jsme v $n!$ započetli právě $k_1! \cdot k_2! \cdots k_r!$-krát.

Kombinace s opakováním: vybíráme $k$ věcí z $n$ druhů, každý druh opakovaně (bonbóny mezi děti, kuličky do barevných krabic). Trik „hvězdičky a přepážky“: rozdělení zapíšeme jako řadu $k$ hvězdiček a $n - 1$ přepážek mezi druhy, vybíráme místa pro přepážky:

$$
\binom{n+k-1}{n-1}
$$

> [!POZOR] Stejné a rozlišitelné objekty se počítají zcela jinak. Deset stejných bonbónů mezi 3 děti je $\binom{12}{2} = 66$ možností, ale deset různých dárků by bylo $3^{10} = 59049$. Vždy si nejdřív ujasni, zda jsou objekty stejné.

## Kombinační čísla a binomická věta

Kombinační čísla mají tři užitečné vlastnosti. Symetrie $\binom{n}{k} = \binom{n}{n-k}$ šetří práci: vybrat 19 z 20 je totéž jako vybrat 1. Pascalovo pravidlo $\binom{n}{k} + \binom{n}{k+1} = \binom{n+1}{k+1}$ staví Pascalův trojúhelník. Součet celého řádku je počet všech podmnožin:

$$
\sum_{k=0}^{n}\binom{n}{k} = 2^n
$$

Protože každý prvek buď v podmnožině je, nebo není ($2$ volby, $n$-krát). Součet jen přes sudé indexy je polovina, tedy $2^{n-1}$.

> [!VETA] Binomická věta rozvíjí $n$-tou mocninu součtu:
>
> $$
> (a+b)^n = \sum_{k=0}^{n}\binom{n}{k}a^k b^{n-k}
> $$
>
> Koeficient $\binom{n}{k}$ říká, z kolika závorek bereme $a$. Pro $n = 2$ dává známé $(a+b)^2 = a^2 + 2ab + b^2$.

Tři typické úlohy s rozvojem: najít člen s danou mocninou (sestav obecný člen $\binom{n}{k}a^k b^{n-k}$, exponent polož roven hledanému a dopočti $k$), sečíst všechny koeficienty (dosaď $x = 1$), najít absolutní člen (dosaď $x = 0$, nebo hledej nulový exponent).

> [!POZOR] V rozvoji $(x+2)^6$ se umocňuje i dvojka: člen s $x^4$ je $\binom{6}{4}x^4 \cdot 2^2 = 60x^4$, ne $15x^4$. A rovnost $(a+b)^2 = a^2 + b^2$ neplatí nikdy (chybí $2ab$).

## Pravděpodobnost

Klasická pravděpodobnost je podíl příznivých a všech možností, pokud jsou všechny stejně možné (kostka, mince, tah z osudí):

> [!VETA] Klasická definice ($m$ příznivých z $n$ možných):
>
> $$
> P(A) = \dfrac{m}{n}
> $$
>
> Doplněk: $P(A') = 1 - P(A)$. Disjunktní jevy se sčítají, nezávislé násobí: $P(A \cap B) = P(A) \cdot P(B)$.

Tah bez vracení mění podmínky: po vytažení bílé koule z 5 bílých a 3 černých je v osudí 4 z 7 bílých, takže pravděpodobnost dvou bílých je $(5/8) \cdot (4/7) = 5/14$. Kdyby se vracelo, bylo by to $(5/8)^2$.

Opakované pokusy s pravděpodobností $p$ a otázkou aspoň jednou vedou na doplněk $1 - (1-p)^n$: jedna minus pravděpodobnost, že jev nenastane nikdy. U „právě $k$-krát“ přibude kombinační číslo: $\binom{n}{k}p^k(1-p)^{n-k}$.

> [!POZOR] Slova s vracením a bez vracení mění výsledek. Druhá nejčastější chyba: sečíst pravděpodobnosti jevů, které se nevylučují (součet pak může přesáhnout 1, což je nesmysl), nebo zapomenout kombinační číslo u „právě $k$-krát“.

## Podmíněná pravděpodobnost a Bayesova věta

Podmíněná pravděpodobnost $P(A|B)$ znamená: jaká je šance $A$, když už víme, že nastalo $B$. Počítá se zúžením prostoru na $B$:

> [!VETA] Podmíněná pravděpodobnost a Bayesova věta:
>
> $$
> P(A|B) = \dfrac{P(A \cap B)}{P(B)}
> $$
>
> $$
> P(A|B) = \dfrac{P(B|A) \, P(A)}{P(B)}
> $$
>
> Bayesova věta otáčí podmínku: z $P(B|A)$ spočte $P(A|B)$.

Klasická aplikace je test na vzácnou nemoc. Představ si 10 000 lidí, nemoc má 1 %, test zachytí 99 % nemocných a falešně hlásí 5 % zdravých:

| Test | Nemocní | Zdraví |
|---|---|---|
| Pozitivní | 99 | 495 |
| Negativní | 1 | 9405 |

Pozitivních je $99 + 495 = 594$, z nich skutečně nemocných jen 99. Pravděpodobnost nemoci při pozitivním testu je $99/594 = 1/6$ — překvapivě málo.

> [!POZOR] Citlivost testu (99 %) není odpověď na otázku „když mám pozitivní test, jaká je šance, že jsem nemocný“. Při vzácné nemoci tvoří většinu pozitivních plané poplachy zdravých — tomu se říká past základní míry.

## Statistické charakteristiky

Průměr je součet dělený počtem. Vážený průměr váží hodnoty podle důležitosti (kilogramy směsi, kredity předmětů):

$$
\bar{x} = \dfrac{x_1 + x_2 + \cdots + x_n}{n}
$$

$$
\bar{x} = \dfrac{w_1 x_1 + w_2 x_2 + \cdots + w_n x_n}{w_1 + w_2 + \cdots + w_n}
$$

Medián je prostřední hodnota po seřazení (u sudého počtu průměr dvou prostředních). Modus je nejčastější hodnota. Medián na rozdíl od průměru nehýbe odlehlá hodnota: u dat 2, 3, 5, 7, 23 je medián 5, ale průměr 8.

> [!VETA] Rozptyl měří průměrnou čtvercovou odchylku od průměru:
>
> $$
> s^2 = \dfrac{(x_1-\bar{x})^2 + \cdots + (x_n-\bar{x})^2}{n}
> $$
>
> Směrodatná odchylka je $s = \sqrt{s^2}$ — vrací míru rozptýlení do původních jednotek.

Pozor na dvě nástrahy. Medián se hledá až po seřazení dat — z neseřazených dat vyjde nesmysl. A průměrná rychlost není aritmetický průměr rychlostí: při stejné vzdálenosti tam a zpět platí harmonický průměr $H = 2/(1/v_1 + 1/v_2)$, protože víc času strávíš pomalou jízdou.

## Typové úlohy SCIO ke kombinatorice a statistice

- **Ciferná čísla s podmínkami.** Kolik čísel má různé cifry, začíná sudou cifrou a podobně. Nástroj: pravidlo součinu místo po místě, nulu na prvním místě zakázat.
- **Výběry s podmínkou aspoň.** Komise, týmy, karty s „aspoň jednou ženou / aspoň jedním esem“. Nástroj: doplněk (všechny minus žádné), ne rozbor případů.
- **Sousedství a kruhové řazení.** Dvě věci vedle sebe (balíček krát vnitřní pořadí), kulatý stůl ($(n-1)!$). Nástroj: nejdřív zafixovat, pak řadit.
- **Stejné objekty do skupin.** Bonbóny mezi děti, řešení rovnice v nezáporných číslech. Nástroj: hvězdičky a přepážky $\binom{n+k-1}{n-1}$.
- **Člen binomického rozvoje.** Koeficient u dané mocniny, absolutní člen, součet koeficientů. Nástroj: obecný člen a dosazení $x = 1$ nebo $x = 0$.
- **Tahy bez vracení.** Koule z osudí, karty z balíčku. Nástroj: kombinační čísla, nebo sekvenční násobení se zužujícím se zlomkem.
- **Asi nejzrádnější: podmíněná pravděpodobnost.** Testy, aktualizace šance po nové informaci. Nástroj: četnostní tabulka (dosadit tisíce lidí), ne pouze vzoreček.
- **Průměry, které nejsou aritmetické.** Směsi (vážený průměr), rychlosti (harmonický průměr), dopočet chybějící hodnoty ze změny průměru. Nástroj: vrátit se k definici (celkový součet, celková dráha lomeno čas).

## Řešené příklady

### Příklad 1

**Zadání:** Kolik dvouciferných čísel lze sestavit z cifer 1, 2, 3, 4 bez opakování?

**Řešení:**

1. Na místě desítek jsou 4 možnosti. Na místě jednotek už jen 3 (cifra se nesmí opakovat). Volby jdou po sobě, takže pravidlo součinu:
2. Výsledek:

   $$
   4 \cdot 3 = 12
   $$

3. Kdyby se cifry směly opakovat, bylo by to $4^2 = 16$ — slova bez opakování výsledek zmenšují.

### Příklad 2

**Zadání:** Kolika způsoby lze přeházet všechna písmena slova ANANAS?

**Řešení:**

1. Šest písmen: A třikrát, N dvakrát, S jednou. Kdyby byla všechna různá, bylo by to $6!$. Stejná písmena ale nové slovo nevytvoří, takže dělíme faktoriály četností:
2. Výsledek:

   $$
   \dfrac{6!}{3! \, 2!} = \dfrac{720}{12} = 60
   $$

3. Jedničku za S psát nemusíme ($1! = 1$), ale zapomenout vydělit trojkou za A by dalo chybně 360.

### Příklad 3

**Zadání:** Určete absolutní člen v rozvoji $(x - 2/x)^6$.

**Řešení:**

1. Obecný člen rozvoje: $\binom{6}{k}x^k(-2/x)^{6-k}$. Mocnina $x$ v něm je $x^{2k-6}$ (protože $x^k$ krát $x^{-(6-k)}$).
2. Absolutní člen má nulový exponent: $2k - 6 = 0$, tedy $k = 3$. Pozor: hledáme $k$, ne dosazujeme $x = 0$ (výraz tam není definován).
3. Dosadíme $k = 3$ včetně znaménka a mocniny u dvojky:

   $$
   \binom{6}{3} \cdot (-2)^3 = 20 \cdot (-8) = -160
   $$

### Příklad 4

**Zadání:** Kolik řešení v nezáporných celých číslech má rovnice $x + y + z + w = 8$?

**Řešení:**

1. Rozdělujeme 8 stejných jednotek do 4 proměnných — to je kombinace s opakováním. Hvězdičky a přepážky: 8 hvězdiček a 3 přepážky do řady, vybíráme místa pro přepážky:
2. Výsledek:

   $$
   \binom{8+4-1}{4-1} = \binom{11}{3} = 165
   $$

3. Kdyby proměnné musely být kladné (aspoň 1), každé bychom nejdřív jednu jednotku dali a rozdělovali jen zbytek 4: $\binom{7}{3} = 35$.

### Příklad 5

**Zadání:** Auto jelo do cíle rychlostí 90 km/h a zpět stejnou trasou rychlostí 45 km/h. Jaká byla průměrná rychlost?

**Řešení:**

1. Aritmetický průměr $(90 + 45)/2 = 67{,}5$ je špatně: pomalou zpáteční cestou strávíš dvakrát víc času. Průměrná rychlost je celková dráha lomeno celkový čas, vzdálenost $d$ se vykrátí.
2. Harmonický průměr:

   $$
   \dfrac{2}{\frac{1}{90}+\frac{1}{45}} = 60
   $$

3. Kontrola přes $d = 90$ km: tam 1 h, zpět 2 h, celkem 180 km za 3 h — tedy 60 km/h.

## Shrnutí vzorců

- Pravidlo součinu: $m \cdot n$; pravidlo součtu: $m + n$; doplněk: všechny minus bez vlastnosti
- $P(n) = n!$; $V(n,k) = n!/(n-k)!$; kruhové řazení $(n-1)!$
- Kombinační číslo:

  $$
  \binom{n}{k} = \dfrac{n!}{k!(n-k)!}
  $$

- Variace s opakováním: $n^k$; permutace s opakováním $n!/(k_1! \cdots k_r!)$
- Kombinace s opakováním: $\binom{n+k-1}{n-1}$
- Symetrie $\binom{n}{k} = \binom{n}{n-k}$; součet řádku $2^n$; součet sudých $2^{n-1}$
- Binomická věta:

  $$
  (a+b)^n = \sum_{k=0}^{n}\binom{n}{k}a^k b^{n-k}
  $$

- Součet koeficientů: dosaď $x = 1$; absolutní člen: dosaď $x = 0$
- $P(A) = m/n$; $P(A') = 1 - P(A)$; nezávislé: $P(A \cap B) = P(A) \cdot P(B)$
- Aspon jednou v $n$ pokusech: $1 - (1-p)^n$
- Podmíněná pravděpodobnost:

  $$
  P(A|B) = \dfrac{P(A \cap B)}{P(B)}
  $$

- Průměr $\bar{x} = (x_1 + \cdots + x_n)/n$; medián až po seřazení; modus nejčetnější
- Rozptyl $s^2$ (průměr čtvercových odchylek); směrodatná odchylka $s = \sqrt{s^2}$
- Harmonický průměr dvou rychlostí: $H = 2/(1/v_1 + 1/v_2)$
