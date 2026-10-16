# Funkce

Funkce přiřazuje každému číslu z definičního oboru právě jednu funkční
hodnotu. SCIO nezkouší definice nazpaměť, ale práci s nimi: definiční obory
složené z více podmínek, čtení vlastností z předpisu, posuny grafu a rovnice,
které se nejsnáze řeší grafickou úvahou. Goniometrické funkce mají vlastní
stránku, zde jsou obecné funkce.

## Definiční obor a obor hodnot

Definiční obor jsou všechna čísla, pro která má předpis smysl. Tři klasické
podmínky:

- jmenovatel zlomku je různý od nuly,
- výraz pod sudou odmocninou je nezáporný,
- argument logaritmu je kladný.

Má-li předpis více částí, platí všechny podmínky současně — výsledkem je
průnik. Každý kraj intervalu se rozhoduje zvlášť: nula ve jmenovateli
nepatří nikdy, odmocnina z nuly definována je.

Obor hodnot jsou všechny hodnoty, kterých funkce nabývá. U kvadratické
funkce ho určí vrchol a směr otevření, u zlomků nerovnost odhadující výraz.

> [!VETA]
> Definiční obor inverzní funkce je obor hodnot původní funkce a naopak.
> Symbolicky: první obor inverze je druhý obor původní funkce.

Definiční obor složené funkce se hledá vždy až ve výsledném předpisu.
Podmínky vnitřní a vnější funkce se nesčítají mechanicky.

> [!POZOR]
> Nejčastější chyba je prohodit ostrost na kraji intervalu: kraj patří, nebo
> nepatří podle toho, zda je příslušná hodnota definovaná, ne podle vzhledu
> nerovnosti. Ověřte dosazením kraje.

## Graf funkce a průsečíky s osami

Graf je množina bodů o souřadnicích

$$
(x, f(x))
$$

pro všechna čísla z definičního oboru.

Průsečík s osou $y$ má vždy nulovou $x$-ovou souřadnici:

$$
P_y = (0, f(0))
$$

Průsečíky s osou $x$ jsou nulové body funkce, tedy řešení rovnice

$$
f(x) = 0
$$

Průsečík dvou grafů se hledá položením předpisů sobě rovných. Vyjde
$x$-ová souřadnice; $y$-ovou je třeba dopočítat dosazením do kteréhokoli
z předpisů.

> [!POZOR]
> Ptá-li se úloha na $y$-ovou souřadnici průsečíku, samotné $x$ nestačí.
> Dosazení do druhého předpisu zároveň slouží jako kontrola.

## Vlastnosti funkcí

Sudá funkce je souměrná podle osy y, lichá podle počátku:

$$
f(-x) = f(x)
$$

$$
f(-x) = -f(x)
$$

Parita má smysl jen na oboru symetrickém podle nuly. Není-li definiční
obor symetrický, funkce není ani sudá, ani lichá — bez ohledu na tvar
předpisu.

Monotonnost znamená chování na intervalu: rostoucí funkce zachovává
nerovnosti, klesající je obrací. U paraboly se monotonnost láme ve
vrcholu, u absolutní hodnoty ve zlomu.

Prostá funkce nabývá každé hodnoty nejvýše jednou. K vyvrácení prostoty
stačí dva různé body se stejnou hodnotou. Každá ostře monotonní funkce
na intervalu je prostá.

Omezená funkce je sevřená zdola i shora. Parabola otevřená nahoru má
minimum, ale omezená není — shora roste nade všechny meze.

| Vlastnost | Otázka | Typický test |
|---|---|---|
| Sudost / lichost | Symetrie grafu? | Dosadit za $x$ výraz $-x$ |
| Monotonnost | Roste / klesá? | Vrchol, zlom, znaménko změny |
| Prostota | Opakují se hodnoty? | Dva body, jedna hodnota |
| Omezenost | Vejde se do pásu? | Odhad výrazu zdola i shora |

## Lineární a kvadratická funkce

Lineární funkce má grafem přímku:

$$
y = ax + b
$$

Koeficient $a$ je směrnice, $b$ je $y$-ový úsek. Přímka stoupá pro kladné $a$
a klesá pro záporné $a$.

Kvadratická funkce má grafem parabolu:

$$
y = ax^2 + bx + c
$$

Vrchol paraboly leží v bodě

$$
x_v = -\frac{b}{2a}
$$

$y$-ová souřadnice se dopočítá dosazením. Parabola je otevřená nahoru pro
kladné $a$ (vrchol je minimum) a dolů pro záporné $a$ (vrchol je maximum).

> [!POZOR]
> Do vzorce pro vrchol patří celé a včetně znaménka. Nejčastější chyba je
> zapomenout minus u záporného $a$, druhá je uvést místo vrcholu kořeny.

## Posuny a převrácení grafu

Z grafu funkce $f$ vznikne graf funkce $g$ posunutím:

$$
g(x) = f(x - h) + k
$$

Graf se posune o $h$ doprava a o $k$ nahoru. Vodorovný posun má převrácené
znaménko: minus uvnitř závorky znamená doprava. Nejspolehlivější kontrola
je sledovat výrazný bod, například vrchol.

Převrácení podle osy $x$ mění znaménko celé funkce:

$$
g(x) = -f(x)
$$

Převrácení podle osy $y$ mění znaménko argumentu:

$$
g(x) = f(-x)
$$

## Absolutní hodnota v grafu

Absolutní hodnota z celé funkce překlopí zápornou část grafu nahoru:

$$
g(x) = |f(x)|
$$

Vše pod osou $x$ se zrcadlí nad ni, zbytek zůstává. Nulové body se nemění.

Absolutní hodnota v argumentu zahodí levou polovinu grafu a pravou
polovinu zrcadlí doleva:

$$
g(x) = f(|x|)
$$

Výsledný graf je vždy souměrný podle osy $y$.

> [!POZOR]
> Oba zápisy se liší jen umístěním čárek absolutní hodnoty, ale grafy
> jsou zcela jiné. Vždy si ujasněte, co je uvnitř absolutní hodnoty.

## Inverzní funkce

Inverzní funkce vrací výpočet zpět: zobrazuje hodnoty na vzory. Graf
inverze vzniká překlopením grafu podle přímky $y = x$. Inverze existuje
právě pro prosté funkce.

Předpis se hledá vyjádřením x z rovnice y = f(x) a záměnou proměnných.
Povinná je zkouška složením oběma směry:

$$
f(f^{-1}(x)) = x
$$

$$
f^{-1}(f(x)) = x
$$

> [!VETA]
> Definiční obor inverze je obor hodnot původní funkce. U odmocnin
> a zlomků se na nové omezení zapomíná nejčastěji — dopočítejte ho vždy.

## Složená funkce

Složení aplikuje funkce postupně zevnitř ven:

$$
(f \circ g)(x) = f(g(x))
$$

Nejdřív se vyhodnotí vnitřní funkce $g$, její výsledek vstupuje do vnější
funkce $f$. Na pořadí záleží: složení není komutativní.

Definiční obor složení se hledá ve výsledném předpisu. Bod musí patřit
do definičního oboru vnitřní funkce a jeho obraz do definičního oboru
vnější funkce.

## Exponenciální a logaritmické funkce

Exponenciální funkce má proměnnou v exponentu:

$$
y = a^x
$$

Pro základ větší než 1 roste, pro základ mezi nulou a jedničkou klesá.
Graf vždy prochází bodem (0, 1).

Logaritmus je inverzní funkce k exponenciále. Platí pro kladné argumenty
a základ různý od jedničky. Logaritmus se základem menším než 1 je
klesající, takže obrací nerovnosti mezi argumenty.

> [!POZOR]
> Záporný exponent základ převrací: výraz se základem menším než 1
> a minuskou v exponentu ve skutečnosti roste. Upravte exponent dřív,
> než rozhodnete o monotonnosti.

## Typové úlohy

### Definiční obor z více podmínek

Každá část předpisu dá vlastní podmínku, výsledek je průnik. Postup:
vypsat podmínky, vyřešit každou zvlášť, udělat jejich průnik a rozhodnout
každý kraj dosazením. Nástraha: jmenovatel pod odmocninou vyžaduje ostrou
nerovnost.

### Parita s absolutní hodnotou

Dosadit $-x$ a porovnat s původním předpisem i s jeho opakem. Absolutní
hodnota se chová sudě, takže často rozhodne zbytek předpisu. Nástraha:
nejdřív ověřit symetrii definičního oboru.

### Počet řešení bez řešení

Rovnice, kterou nelze elementárně vyřešit, se rozhoduje monotonností:
rostoucí a klesající spojitá funkce se protnou právě jednou. Stačí najít
bod, kde je levá strana menší, a bod, kde je větší. Nástraha: zapomenout
doložit existenci průsečíku.

### Inverze a její obor

Předpis inverze se hledá vyjádřením $x$ a záměnou proměnných, obor
inverze je obor hodnot původní funkce. Nástraha: opsat původní obor
místo nového — u odmocnin a zlomků se chyba pozná zkouškou složením.

## Řešené příklady

### Příklad 1

**Zadání:** Určete definiční obor funkce

$$
f(x) = \frac{\sqrt{x+3}}{x^2-4}
$$

**Řešení:**

1. Odmocnina v čitateli dává podmínku

$$
x + 3 \ge 0
$$

tedy čísla od −3 výš.

2. Jmenovatel nesmí být nula: výraz $x^2 - 4$ je nulový pro $x = 2$
a $x = -2$, tedy zákaz bodů 2 a −2. Oba leží v intervalu od −3 výš,
takže oba skutečně vypadnou.

3. Průnikem je sjednocení tří intervalů:

$$
\langle -3, -2) \cup (-2, 2) \cup (2, \infty)
$$

Kraj −3 patří, protože odmocnina z nuly je definovaná.

### Příklad 2

**Zadání:** Rozhodněte, zda je funkce

$$
f(x) = x^3 - x|x|
$$

sudá, nebo lichá.

**Řešení:**

1. Definiční obor je celé $\mathbb{R}$, tedy symetrický — parita má smysl.

2. Dosadíme $-x$:

$$
f(-x) = (-x)^3 - (-x)|-x|
$$

3. Upravíme. Platí $(-x)^3 = -x^3$ a $(-x)|-x| = -x|x|$, takže

$$
f(-x) = -x^3 + x|x| = -f(x)
$$

4. Funkce je lichá. Absolutní hodnota se chovala sudě, ale násobení
lichým $x$ z ní udělalo lichý sčítanec.

### Příklad 3

**Zadání:** Určete počet řešení rovnice

$$
|x-1| = 2-x^2
$$

**Řešení:**

1. Rozdělíme podle znaménka výrazu v absolutní hodnotě. Pro $x \ge 1$
platí $|x-1| = x-1$ a rovnice zní

$$
x - 1 = 2 - x^2
$$

2. Úprava dá $x^2 + x - 3 = 0$, tedy

$$
x = \frac{-1 \pm \sqrt{13}}{2}
$$

Podmínce $x \ge 1$ vyhovuje jen kladná větev, přibližně 1,30.

3. Pro $x < 1$ platí $|x-1| = 1-x$ a rovnice zní

$$
1 - x = 2 - x^2
$$

4. Úprava dá $x^2 - x - 1 = 0$, tedy

$$
x = \frac{1 \pm \sqrt{5}}{2}
$$

Podmínce $x < 1$ vyhovuje jen záporná větev, přibližně −0,62.

5. Rovnice má dvě řešení. Zbylé dva kořeny jsou falešné: nesplňují
větev, ze které vzešly.

### Příklad 4

**Zadání:** K funkci

$$
f(x) = x^2-4x+3, \quad x \ge 2
$$

najděte předpis inverzní funkce a její definiční obor.

**Řešení:**

1. Parabola má vrchol v $x = 2$. Na polopřímce od dvojky výš je funkce
ostře rostoucí, tedy prostá — inverze existuje.

2. Vyjádříme $x$ z rovnice $y = x^2-4x+3$:

$$
x^2-4x+(3-y) = 0
$$

$$
x = \frac{4 \pm \sqrt{16-4(3-y)}}{2} = 2 \pm \sqrt{1+y}
$$

3. Podmínka $x \ge 2$ vybere kladnou větev. Po záměně proměnných:

$$
f^{-1}(x) = 2+\sqrt{1+x}
$$

4. Definiční obor inverze je obor hodnot původní funkce. Minimum
$f(2) = -1$ dává interval od −1 výš. Zkouška: $f^{-1}(0) = 3$
a $f(3) = 0$.

## Shrnutí

- Definiční obor z více podmínek je jejich průnik, každý kraj se
rozhoduje dosazením.
- Parita vyžaduje symetrický obor; testuje se dosazením $-x$.
- Vrchol paraboly: $x$ se počítá vzorcem, $y$ dosazením.
- Posun $f(x-h)+k$ znamená doprava o $h$ a nahoru o $k$.
- Absolutní hodnota kolem funkce klopí graf, v argumentu zrcadlí.
- Inverze: vyjádřit, zaměnit, obor je původní obor hodnot, zkouška
složením.
- Složení se čte zevnitř ven a není komutativní.
- Základ menší než 1 u exponenciály klesá, u logaritmu obrací
nerovnosti; záporný exponent základ převrací.
