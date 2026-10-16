# Rovnice a nerovnice

Rovnice je rovnost, ve které vystupuje neznámá; řešit ji znamená najít všechna čísla, po jejichž dosazení se z rovnosti stane pravdivý výrok. Nerovnice se řeší podobně, jen výsledkem bývá interval. Pozornost věnuj zejména úpravám, které mohou změnit množinu řešení, podmínkám u jmenovatelů, odmocnin a logaritmů a rovnicím s parametrem.

## Co znamená řešit rovnici

Každá úprava rovnice buď množinu řešení zachovává (ekvivalentní úprava), nebo ji mění. Cílem je dojít k tvaru, ze kterého řešení přímo přečteš, a cestou nic neztratit ani nepřidat.

> [!VETA] Ekvivalentní úpravy zachovávají množinu řešení na původním definičním oboru:
>
> - přičtení či odečtení stejného výrazu definovaného na tomto oboru,
> - násobení či dělení stejným výrazem, který na tomto oboru není nulový,
> - záměna levé a pravé strany.
>
> U rovnic znaménko násobitele nehraje roli. Jeho nenulovost ano: dělením výrazem $x$ můžeš ztratit řešení $x = 0$. Násobení nulou naopak z každé definované rovnice udělá rovnost $0 = 0$, a zruší tak původní omezení.

> [!POZOR] Druhá mocnina může přidat falešné kořeny: z $a=b$ plyne $a^2=b^2$, obráceně ale připadá v úvahu i $a=-b$. Jsou-li obě strany nezáporné, je umocnění na druhou ekvivalentní. Třetí mocnina je ekvivalentní pro všechna reálná čísla. Kandidáty po umocnění kontroluj v původní rovnici.

Odmocnit obě strany druhou odmocninou lze, jsou-li nezáporné. Logaritmovat obě strany lze, jsou-li kladné, se stejným platným základem. Tyto podmínky vždy ověř před úpravou.

Zkouška a podmínky jsou dvě strany téže mince: podmínky dopředu zužují kandidáty (např. $x \ge 0$), zkouška zpětně ověřuje ty, kteří prošli. U těžších rovnic používej obojí.

## Lineární rovnice

Rovnice $ax + b = 0$ s neznámou $x$. Postup: zbav se závorek roznásobením, zbav se zlomků vynásobením společným jmenovatelem, převeď členy s $x$ nalevo a čísla napravo, nakonec vyděl koeficientem u $x$.

$$
x = -\dfrac{b}{a}
$$

pro $a$ ≠ $0$.

Zvláštní případy po zjednodušení: tvar $0x = 5$ nemá řešení, tvar $0x = 0$ nepřidává žádné omezení: vyhoví každé číslo z původního definičního oboru. U běžné lineární rovnice je to celé $\mathbb{R}$.

> [!POZOR] Záporným číslem násobíš každý člen závorky: $-2(2x+1)$ je $-4x-2$, ne $-4x+2$. Druhá klasická chyba je zapomenout vynásobit jmenovatelem i osamocená čísla bez zlomku.

### Rovnice se zlomky a podmínky

Jmenovatele původní rovnice nesmějí být nulové. Teprve na takto omezeném oboru smíš násobit společným jmenovatelem. Po výpočtu porovnej kandidáty s původními zákazy, i když se zlomek cestou zkrátil.

Například:

$$
\frac{x+1}{x-2}=\frac{3}{x-2}.
$$

Podmínkou je $x$ ≠ $2$. Po vynásobení dostaneš $x+1=3$, tedy $x=2$. Tato hodnota je zakázaná, takže původní rovnice nemá řešení. Naopak rovnost $(x^2-4)/(x-2)=x+2$ platí pro každé reálné $x$ kromě 2.

### Jak sestavit rovnici ze slovní úlohy

Neznámou nejprve pojmenuj i s jednotkou. Každý údaj přelož na výraz a rovnítkem spoj dvě vyjádření téže veličiny. Například „první cena je o 200 Kč nižší“ znamená, že k první ceně přičteš 200 a dostaneš druhou cenu.

- Sleva $p$ procent z ceny $c$ dává $c(1-p/100)$. Následná pevná sleva se odečítá až z této ceny.
- Doba pohybu je $t=s/v$. K ní přičti zastávky: při $n$ zastávkách po $h$ hodinách je celkem $s/v+nh$ hodin.
- Počty lidí či zastávek bývají celá nezáporná čísla. Algebraické řešení navíc musí splňovat tyto podmínky.
- Opačné číslo k $x$ je $-x$; převrácené číslo je $1/x$ a existuje pouze pro $x$ ≠ $0$.

Rovnice může odhalit i rozpor v zadání. Jsou-li dvě skupiny stejně početné a první se zdvojnásobí, tvoří druhá třetinu nového celku bez ohledu na původní počet. Jiný požadovaný podíl by s těmito údaji nebyl slučitelný.

## Soustavy lineárních rovnic

Dvě rovnice o dvou neznámých řeš sčítací metodou (rovnice vynásob tak, aby po sečtení jedna neznámá vypadla), nebo dosazovací metodou (z jedné rovnice vyjádři neznámou a dosaď do druhé). Obě metody vedou k cíli; sčítací bývá rychlejší, když se koeficienty hezky doplňují.

Počet řešení poznáš z průběhu výpočtu: vyjde-li $0 = 5$, soustava nemá řešení; jestliže se jedna rovnice změní na $0 = 0$ a druhá popisuje přímku, má soustava nekonečně mnoho řešení na této přímce. Samotná rovnost $0 = 0$ neznamená, že lze zbylou rovnici zahodit. Geometricky jde o dvě přímky: různoběžky (jedno řešení), rovnoběžky (žádné), totožné přímky (nekonečně mnoho).

> [!VETA] Po dosazení vždy ověř nalezenou dvojici v obou původních rovnicích. Jediná chyba ve znaménku dá dvojici, která vypadá věrohodně, ale nevyhovuje ani jedné rovnici.

U slovních úloh se soustavou si po výpočtu znovu přečti otázku: vypočítáš obě neznámé, ale ptají se často jen na jednu z nich.

## Kvadratické rovnice

Rovnice $ax^2 + bx + c = 0$ s $a$ ≠ $0$. O počtu reálných řešení rozhoduje diskriminant:

$$
D = b^2 - 4ac
$$

| Diskriminant | Počet reálných řešení |
|---|---|
| $D > 0$ | dvě různá |
| $D = 0$ | jedno (dvojnásobné) |
| $D < 0$ | žádné |

Kořeny dává vzorec:

$$
x = \dfrac{-b \pm \sqrt{D}}{2a}
$$

Vzorec funguje díky doplnění na čtverec: levou stranu lze přepsat jako $a$ krát čtverec plus zbytek, ve kterém se objeví právě $D$:

$$
ax^2 + bx + c = a\left(x + \dfrac{b}{2a}\right)^2 - \dfrac{D}{4a}
$$

Je-li $D$ kladné, čtverec se rovná kladnému číslu a dá dva kořeny; je-li $D$ záporné, rovnal by se zápornému číslu, což (v reálných číslech) nejde.

Zvláštní tvary řeš bez vzorce: pro $b = 0$ je $x^2 = -c/a$ (řešení existuje, jen když je $-c/a$ nezáporné); pro $c = 0$ vytkni $x$ před závorku ($x(ax+b) = 0$ má kořeny $x = 0$ a $x = -b/a$). Bikvadratickou rovnici převeď substitucí $t = x^2$ na kvadratickou pro $t$.

> [!POZOR] U bikvadratické rovnice se záporné hodnoty $t$ zahazují ($x^2$ je vždy nezáporné), ale z každého kladného $t$ vzniknou dva kořeny $x = \pm\sqrt{t}$. Nejčastější chyba je zapomenout jednu z těchto dvou stran.

### Počet různých kořenů a užitečné zkratky

Součin je nulový, právě když je alespoň jeden činitel nulový. Například $x^3(x^2-5)=0$ má tři různé reálné kořeny: $0$, $\sqrt5$ a $-\sqrt5$. Trojnásobný kořen 0 počítáme mezi různými kořeny jen jednou. Dělením výrazem $x^3$ by se ztratil.

Ne vždy potřebuješ dopočítat samotné $x$. Pokud znáš součet $x+1/x=s$, můžeš pro $x$ ≠ $0$ rovnou použít:

$$
x^2+\frac1{x^2}=\left(x+\frac1x\right)^2-2=s^2-2.
$$

## Vietovy vzorce

> [!VETA] Pro kořeny $x_1$ a $x_2$ rovnice $ax^2+bx+c = 0$ platí:
>
> $$
> x_1 + x_2 = -\dfrac{b}{a} \qquad x_1 x_2 = \dfrac{c}{a}
> $$
>
> Pro $a = 1$ se vzorce zkrátí na $x_1+x_2 = -b$ a $x_1 x_2 = c$.

Vieta slouží ke třem věcem: rychlé hledání kořenů zpaměti (uhádni dvojici se správným součtem a součinem), podmínky na znaménka kořenů (oba kladné: součet i součin kladný; opačná znaménka: součin záporný) a rozklad na součin $a(x-x_1)(x-x_2)$.

> [!POZOR] Vietovy vzorce samy o sobě nezaručují, že kořeny existují. Podmínka „součet kladný a součin kladný" ještě neznamená dva kladné kořeny — pro dva různé reálné kořeny přidej $D > 0$; připouštíš-li i dvojnásobný kořen, stačí $D \ge 0$. To platí i u rovnic s parametrem.

## Rovnice s parametrem

Parametr $k$ je číslo, jehož hodnotu neznáme; ptáme se, pro které jeho hodnoty má rovnice danou vlastnost (jedno řešení, dva kladné kořeny, žádné řešení). Postup má tři kroky:

1. Najdi „zlomové" hodnoty parametru: kde se nuluje koeficient u nejvyšší mocniny a kde je $D = 0$.
2. Každou zlomovou hodnotu vyšetři zvlášť dosazením do původní rovnice.
3. Pro ostatní hodnoty řeš rovnici obecně a podmínky zapiš jako nerovnice pro $k$.

Nelekni se odmocninových hranic (např. $3-2\sqrt{2} \approx 0{,}17$); pro zařazení do intervalu obvykle stačí hrubý odhad velikosti.

> [!POZOR] U rovnice $kx^2-4x+2 = 0$ nestačí podmínka $D = 0$ (dá $k = 2$). Pro $k = 0$ se rovnice změní na lineární $-4x+2 = 0$ s jediným řešením $x = 1/2$, takže správná odpověď je $k = 0$ nebo $k = 2$. Zlomovou hodnotu, která mění typ rovnice, nesmíš nikdy přeskočit.

## Iracionální rovnice

Rovnice s neznámou pod odmocninou. Postup:

1. Podmínky: výraz pod odmocninou je nezáporný; rovná-li se odmocnina výrazu, musí být ten výraz nezáporný.
2. Osamostatni jednu odmocninu na jedné straně rovnice.
3. Umocni obě strany a vzniklou rovnici vyřeš.
4. Každého kandidáta ověř zkouškou v původní rovnici.

> [!VETA] Druhá odmocnina je vždy nezáporná: rovnice $\sqrt{A} = B$ může mít řešení jen pro $B \ge 0$ a $A \ge 0$. Někdy tyto dvě podmínky samy o sobě pustí jediného kandidáta a umocnění pak slouží jen jako kontrola.

> [!POZOR] Umocněnou rovnici řešíš spolu s podmínkami původní rovnice. Falešný kořen můžeš vyřadit už podle znaménka pravé strany. Zkouška dosazením je spolehlivá závěrečná kontrola, zvlášť při opakovaném umocňování.

### Substituce s odmocninou

Pro rovnici $x+\sqrt{x}-6=0$ polož $t=\sqrt{x}$, tedy $t\ge0$ a $x=t^2$. Dostaneš $t^2+t-6=0$ s kořeny 2 a −3. Zápornou hodnotu vyřaď; z $t=2$ vychází $x=4$. Zkouška: $4+2-6=0$.

## Exponenciální rovnice

Neznámá je v exponentu. Nástroje podle tvaru rovnice:

1. Stejný základ: $a^x = a^y$ (pro $a > 0$, $a$ ≠ $1$) platí právě když $x = y$. Obě strany nejdřív přepiš na stejný základ.
2. Vytýkání: $2^{x+1}$ je $2\cdot 2^x$, takže součet $2^{x+1}+2^x$ je $3\cdot 2^x$. Rozepiš mocniny se součtem v exponentu a společnou mocninu vytkni.
3. Substituce $t = a^x$: rovnice typu $4^x-3\cdot 2^x+2 = 0$ je po přepisu $4^x = (2^x)^2$ kvadratická pro $t$.

> [!VETA] Mocnina kladného základu je vždy kladná. Proto substituce $t = a^x$ vyžaduje $t > 0$: každé $t \le 0$ se zahazuje bez náhrady a každé kladné $t$ se ještě převádí zpět na $x$.

> [!POZOR] Sčítat exponenty smíš jen při násobení mocnin ($2^x\cdot 2 = 2^{x+1}$). Součet $2^{x+1}+2^x$ se nekrátí na $2^{2x+1}$ — vytkni $2^x$ a dostaneš $3\cdot 2^x$.

### Když základy nelze snadno sjednotit

Obě strany kladné rovnice lze zlogaritmovat. Například:

$$
3^x=5^{x-1}\quad\Rightarrow\quad x\ln 3=(x-1)\ln 5
$$

Po seskupení členů s neznámou:

$$
x=\frac{\ln 5}{\ln 5-\ln 3}.
$$

## Logaritmické rovnice

Logaritmus odpovídá na otázku „na jaký exponent umocnit základ, abych dostal dané číslo“:

$$
\log_a x=y\quad\Longleftrightarrow\quad a^y=x.
$$

Platí $a>0$, $a$ ≠ $1$ a $x>0$. Například $\log_4 64=3$, protože $4^3=64$. V tomto výkladu značí $\log x$ dekadický logaritmus se základem 10 a $\ln x$ přirozený logaritmus se základem $e$.

Změna základu (také $b>0$, $b$ ≠ $1$):

$$
\log_a x=\frac{\log_b x}{\log_b a}.
$$


> [!VETA] Pravidla logaritmů (základ $a > 0$, $a$ ≠ $1$; argumenty kladné):
>
> $$
> \log_a (xy) = \log_a x + \log_a y \qquad \log_a \dfrac{x}{y} = \log_a x - \log_a y
> $$
>
> $$
> \log_a x^r = r\log_a x \qquad a^{\log_a x} = x
> $$

Postup: nejdřív podmínky (každý argument logaritmu je kladný), pak sloučení logaritmů pravidly na jeden, pak odlogaritmování ($\log_a A = \log_a B$ právě když $A = B$ na společném definičním oboru). Rovnice s $\log_a x$ ve vyšších mocninách řeš substitucí $t = \log_a x$.

> [!POZOR] Podmínky se píšou z původního tvaru rovnice. Součin $(x+1)(x-1)$ je kladný i pro $x = -3$, ale původní logaritmy $\log_2(x+1)$ a $\log_2(x-1)$ tam definované nejsou — $x = -3$ se musí vyřadit.

## Goniometrické rovnice v kostce

Podrobný výklad je v jednotce Goniometrie; zde jen to, co potřebuješ jako řešitel rovnic. Základní rovnice (pro $a$ v oboru hodnot dané funkce):

- $\sin x = a$: dvě větve ($x = \alpha+2k\pi$ nebo $x = \pi-\alpha+2k\pi$),
- $\cos x = a$: dvě větve ($x = \pm\alpha+2k\pi$),
- $\tan x = a$: jediná rodina s periodou $\pi$ ($x = \alpha+k\pi$).

Složitější rovnice převáděj na tyto základní: substitucí ($t = \sin x$, pak zahodit $t$ mimo $\langle -1, 1\rangle$), vytýkáním místo dělení (před dělením výrazem s neznámou vyšetři jeho nulové body), a kondenzací součtu $a\sin x+b\cos x$ na jedinou funkci:

$$
a\sin x + b\cos x = \sqrt{a^2+b^2}\sin(x+\varphi)
$$

pro vhodný posun $\varphi$.

> [!POZOR] U rovnosti sinů nezapomeň druhou větev: $\sin A = \sin B$ znamená $A = B+2k\pi$ nebo $A = \pi-B+2k\pi$. Kdo použije jen první větev, ztratí polovinu řešení.

## Nerovnice

Lineární nerovnice se řeší stejnými úpravami jako rovnice s jedním rozdílem navíc:

> [!VETA] Násobení a dělení obou stran nerovnice záporným číslem otáčí znaménko nerovnosti. Násobení a dělení kladným číslem ho nechává.

Má-li kvadratický trojčlen dva různé reálné kořeny, řeš nerovnici přes nulové body a tvar paraboly: parabola otevřená nahoru je záporná mezi kořeny a kladná vně (u paraboly otevřené dolů naopak). U ostré nerovnosti ($<$, $>$) nulové body nepatří do řešení; u neostré ($\le$, $\ge$) patří, pokud jsou v definičním oboru. Nekonečno nikdy není uzavřený kraj.

Podílové a součinové nerovnice řeš znaménkovou tabulkou: najdi nulové body čitatele i jmenovatele, rozděl osu na intervaly a v každém urči znaménko. Nulové body jmenovatele nepatří do řešení nikdy, ani u neostré nerovnosti.

U exponenciálních a logaritmických nerovnic rozhoduje monotonie základu: pro $a > 1$ se směr nerovnosti zachovává, pro $0 < a < 1$ se otáčí:

$$
2^x < 8 \;\Rightarrow\; x < 3 \qquad \left(\frac{1}{2}\right)^x < 8 \;\Rightarrow\; x > -3
$$

> [!POZOR] Nerovnici nikdy nenásob jmenovatelem, jehož znaménko neznáš. Zlomek $(x-1)/(x+3)$ se proti nule neporovnává „vynásobením závorkou", ale znaménkovou tabulkou — a bod $x = -3$ nepatří do řešení, i když je nerovnice neostrá.

### Dvojnásobný kořen a žádný reálný kořen

Je-li $D=0$, trojčlen má tvar $a(x-r)^2$. Mimo $r$ má znaménko koeficientu $a$; přes dvojnásobný kořen se znaménko nemění. Pro $a>0$:

| Nerovnice | Řešení |
|---|---|
| $a(x-r)^2>0$ | všechna reálná čísla kromě $r$ |
| $a(x-r)^2\ge0$ | všechna reálná čísla |
| $a(x-r)^2<0$ | prázdná množina |
| $a(x-r)^2\le0$ | pouze $r$ |

Pro $a<0$ se kladné a záporné hodnoty prohodí. Je-li $D<0$, nemá trojčlen žádný nulový bod a má všude znaménko $a$. Například $-x^2-4<0$ platí pro všechna reálná čísla, zatímco $-x^2-4\ge0$ nemá řešení.

### Součin, podíl a znaménka

Nejprve převeď vše na jednu stranu, aby na druhé byla nula. Pak hledej body, kde se některý činitel nuluje nebo výraz není definovaný. V každém vzniklém intervalu stačí zjistit znaménka činitelů. Stejná znaménka dávají kladný součin i podíl, opačná záporný.

U nerovnice $(x+4)(x-2)>0$ vyhovují vnější intervaly: $x<-4$ nebo $x>2$. U podílu $(x+4)/(x-2)\le0$ vyhovuje:

$$
x\in\langle-4;2).
$$

Bod −4 přidáme kvůli rovnosti; bod 2 je zakázaný. U činitele se sudou násobností se znaménko nemusí změnit — nepřepínej automaticky plus a minus po každém nulovém bodu.

Ani násobení neznámou není samo o sobě chybné, musíš ale znát její znaménko. V nerovnici $6/x>2$ je $x$ ≠ $0$. Pro $x>0$ dostaneš $x<3$, dohromady $0<x<3$. Pro $x<0$ se znaménko obrátí: $6<2x$, což se záporným $x$ není slučitelné. Výsledkem je $(0;3)$.

Umocnění nerovnice na druhou zachovává směr při nezáporných stranách. Bez této podmínky může výsledek změnit: z $-3<2$ nelze odvodit $9<4$.

### Soustavy nerovnic

V soustavě musejí všechny nerovnice platit současně. Vyřeš každou zvlášť a udělej **průnik** výsledků. Například $2x+1>5$ dává $x>2$ a $3x-2\le13$ dává $x\le5$. Společně:

$$
x\in(2;5\rangle.
$$

Pokud podmínky znějí například $x>4$ a zároveň $x\le1$, průnik je prázdný. U počtu celočíselných řešení až nakonec vyber celá čísla; nezaměňuj celá a kladná celá čísla a kontroluj oba kraje.

## Rovnice a nerovnice s absolutní hodnotou

Absolutní hodnota je vzdálenost od nuly: $|x|=x$ pro $x\ge0$ a $|x|=-x$ pro $x<0$. Obecně $|x-a|$ měří vzdálenost čísel $x$ a $a$.

### Jeden výraz v absolutní hodnotě

Pro $c>0$ platí:

| Vztah | Ekvivalentní podmínky |
|---|---|
| $\lvert u\rvert=c$ | $u=c$ nebo $u=-c$ |
| $\lvert u\rvert<c$ | $-c<u<c$ |
| $\lvert u\rvert\le c$ | $-c\le u\le c$ |
| $\lvert u\rvert>c$ | $u<-c$ nebo $u>c$ |
| $\lvert u\rvert\ge c$ | $u\le-c$ nebo $u\ge c$ |

Je-li $c=0$, rovnost či nerovnost $|u|\le0$ vyžaduje $u=0$, zatímco $|u|<0$ nemá řešení. Je-li $c<0$, nemá řešení ani $|u|=c$, ani $|u|\le c$; naopak $|u|>c$ platí pro každé definované $u$.

Například $|2x-3|=7$ dává $2x-3=7$ nebo $2x-3=-7$, tedy $x=5$ nebo $x=-2$. Nerovnice $|x-2|<3$ popisuje body vzdálené od 2 méně než 3, tedy $x\in(-1;5)$.

### Více absolutních hodnot

Najdi nulové body výrazů uvnitř absolutních hodnot. Rozděl jimi celou osu, v každém intervalu nahraď absolutní hodnoty správně podepsanými výrazy a vyřeš rovnici či nerovnici. Výsledek každé větve omez na interval, ve kterém jsi počítal. Nakonec větve **sjednoť**.

Příklad:

$$
|x-1|+|x-5|\le8.
$$

- Pro $x<1$: $(1-x)+(5-x)\le8$, tedy $x\ge-1$. V této větvi vyhovuje $\langle-1;1)$.
- Pro $1\le x\le5$: $(x-1)+(5-x)=4$, takže vyhovuje celý interval $\langle1;5\rangle$.
- Pro $x>5$: $(x-1)+(x-5)\le8$, tedy $x\le7$. V této větvi vyhovuje $(5;7\rangle$.

Sjednocením dostaneme $\langle-1;7\rangle$. Geometricky jde o součet vzdáleností od bodů 1 a 5; mezi těmito body je stále roven 4.

> [!POZOR] Ve větvi $x<a$ je $|x-a|=-(x-a)=a-x$. Minus patří celé závorce. U soustavy absolutních nerovnic nakonec bereš průnik řešení jednotlivých nerovnic, nikoli jejich sjednocení.

### Absolutní hodnota ve jmenovateli a v soustavě

Pro $x$ ≠ $0$ je $|12/x|=12/|x|$. Nerovnost $|12/x|>4$ tedy znamená $0<|x|<3$: nula zůstává zakázaná, přestože by prosté $|x|<3$ splňovala.

V soustavě s absolutními hodnotami můžeš nejprve vyjádřit celý výraz, například $|x-a|$, a dosadit jej do druhé rovnice. Teprve potom rozlišuj znaménka. Ptá-li se úloha na počet dvojic $(x,y)$, jedna hodnota $y$ může připouštět dvě hodnoty $x$.

## Typové úlohy SCIO k rovnicím

- **Ekvivalentní vs. neekvivalentní úpravy.** Poznat úpravu, která mění množinu řešení (násobení nulou, dělení výrazem s neznámou). Nástroj: seznam ekvivalentních úprav zpaměti.
- **Soustavy a slovní úlohy.** Sestavit rovnice z textu a dopočítat přesně to, na co se ptají. Nástroj: sčítací metoda + kontrola otázky.
- **Vieta naruby.** Podmínka o kořenech (poměr, rozdíl, jeden větší o 1) místo přímého řešení. Nástroj: označit kořeny a použít jejich součet a součin.
- **Parametr se změnou typu.** Hodnota parametru, která z kvadratické rovnice udělá lineární. Nástroj: zlomové hodnoty vyšetřit vždy zvlášť.
- **Umocnění a falešné kořeny.** Iracionální rovnice, kde umocněná rovnice dá kořen navíc. Nástroj: podmínky + povinná zkouška.
- **Substituce s návratem.** Exponenciální, logaritmické a bikvadratické rovnice, kde se $t$ musí převést zpět na $x$. Nástroj: každé $t$ zvlášť a jeho vlastní podmínka: pro $t=x^2$ či $t=\sqrt{x}$ je $t\ge0$, pro $t=a^x$ je $t>0$, ale $t=\log_a x$ smí být libovolné reálné číslo.
- **Podmínky z původního tvaru.** Logaritmy, odmocniny a zlomky, kde upravený tvar vypadá nevinně, ale původní má užší definiční obor. Nástroj: podmínky psát vždy před úpravami.
- **Znaménkové pasti u nerovnic.** Otáčení u záporného dělitele a u základu menšího než 1, otevřené vs. uzavřené kraje, body mimo definiční obor. Nástroj: znaménková tabulka + kontrola krajů.

## Řešené příklady

### Příklad 1

**Zadání:** Řešte $2(x-1)-(x+3)/2 = 4$.

**Řešení:**

1. Zlomku se zbavíme vynásobením dvěma (volíme nejmenší společný jmenovatel, aby zlomek zmizel):

   $$
   4(x-1) - (x+3) = 8
   $$

2. Roznásobíme — pozor na minus před závorkou:

   $$
   4x - 4 - x - 3 = 8
   $$

3. $3x = 15$, tedy $x = 5$. Zkouška: $2\cdot 4-8/2 = 8-4 = 4$. ✓

### Příklad 2

**Zadání:** Jeden kořen rovnice $x^2-5x+m = 0$ je o $1$ větší než druhý. Určete $m$.

**Řešení:**

1. Označme kořeny $r$ a $r+1$. Součet z Viety: $r+(r+1) = 5$, tedy $r = 2$ a druhý kořen je $3$.
2. Součin z Viety je $m$: $m = 2\cdot 3 = 6$.
3. Kontrola: rovnice $x^2-5x+6 = 0$ má kořeny $2$ a $3$, jejich rozdíl je $1$. ✓ (Volba Viety místo diskriminantu: podmínka je o vztahu kořenů, ne o jejich existenci.)

### Příklad 3

**Zadání:** Řešte $\sqrt{2x+1} = x-1$.

**Řešení:**

1. Podmínky: $2x+1 \ge 0$ a $x-1 \ge 0$, tedy $x \ge 1$. (Z druhé plyne i první: $x \ge 1$ dává $2x+1 \ge 3$.)
2. Obě strany nezáporné, smíme umocnit:

   $$
   2x + 1 = x^2 - 2x + 1
   $$

   $$
   x^2 - 4x = 0
   $$

3. $x(x-4) = 0$: kandidáti $x = 0$ a $x = 4$. Podmínce $x \ge 1$ vyhoví jen $x = 4$; zkouška: $\sqrt{9} = 3 = 4-1$. ✓

### Příklad 4

**Zadání:** Řešte $2^{2x}-5\cdot 2^x+4 = 0$.

**Řešení:**

1. Protože $2^{2x} = (2^x)^2$, volíme substituci $t = 2^x$ (rozpoznání skrytého čtverce je celý trik):

   $$
   t^2 - 5t + 4 = 0
   $$

2. $t = 1$ nebo $t = 4$. Obě hodnoty jsou kladné, takže obě postupují dál.
3. Návrat k $x$: $2^x = 1$ dává $x = 0$; $2^x = 4$ dává $x = 2$. ✓

### Příklad 5

**Zadání:** Pro která $k$ má rovnice $x^2-kx+4 = 0$ dva různé záporné kořeny?

**Řešení:**

1. Tři podmínky: $D > 0$ (dva různé reálné kořeny), součet $k$ záporný, součin $4$ kladný (ten platí vždy).
2. $D = k^2-16 > 0$ dává $k < -4$ nebo $k > 4$; součet kořenů je $k$, takže $k < 0$. (Volba postupu: znaménka kořenů se čtou z Viety, existence z diskriminantu.)
3. Průnik: $k < -4$. ✓

### Příklad 6

**Zadání:** Řešte $(x+2)/(x-1) \le 0$.

**Řešení:**

1. Nulový bod čitatele $x = -2$; jmenovatel nesmí být nula: $x$ ≠ $1$. (Násobení závorkou $(x-1)$ by vyžadovalo rozdělení na případy podle jejího znaménka.)
2. Znaménka po intervalech: pro $x < -2$ je zlomek kladný, pro $-2 < x < 1$ záporný, pro $x > 1$ kladný.
3. Vyhoví záporný interval; bod $x = -2$ patří (neostrá nerovnost), bod $x = 1$ nikdy:

   $$
   x \in \langle -2;\, 1)
   $$

## Shrnutí vzorců

- $D = b^2-4ac$
- $x = (-b\pm\sqrt{D})/(2a)$
- $x_1+x_2 = -b/a$, $x_1 x_2 = c/a$ (pro $a = 1$: $-b$ a $c$)
- Stejný základ: $a^x = a^y$ ($a > 0$, $a$ ≠ $1$) platí právě když $x = y$.
- Odlogaritmování: $\log_a A = \log_a B$ právě když $A = B$ (na definičním oboru).
- $\log_a(xy) = \log_a x+\log_a y$
- $\log_a(x/y) = \log_a x-\log_a y$
- $\sqrt{A} = B$ vyžaduje $A \ge 0$ a $B \ge 0$.
- Substituce: $t = x^2$ ($t \ge 0$), $t = a^x$ ($t > 0$), $t = \log_a x$.
- Nerovnice: dělení záporným číslem otáčí; základ $0 < a < 1$ otáčí u mocnin i logaritmů.
- $\sin A = \sin B$: $A = B+2k\pi$ nebo $A = \pi-B+2k\pi$.
- Kvadratický vzorec v display podobě:

  $$
  x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
  $$
