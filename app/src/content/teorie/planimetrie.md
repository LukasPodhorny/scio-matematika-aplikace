# Planimetrie

Planimetrie je geometrie roviny: trojúhelníky, mnohoúhelníky, kružnice a jejich obvody a obsahy. Ve SCIO jde většinou o dosazení do správného vzorce — a o to nenaletět na podobné, ale špatné číslo. Nejčastější chyby: záměna obvodu s obsahem, poloměru s průměrem a lineárního poměru s kvadratickým.

## Trojúhelníky a jejich prvky

Součet vnitřních úhlů trojúhelníku je $180°$. Plyne to z rovnoběžky vedené vrcholem: střídavé úhly přenesou všechny tři úhly na přímku.

> [!VETA] Trojúhelníková nerovnost: součet každých dvou stran je větší než strana třetí:
>
> $$
> a + b > c \qquad b + c > a \qquad c + a > b
> $$
>
> Rovnost znamená body v přímce, ne trojúhelník.

> [!VETA] Pythagorova věta: v pravoúhlém trojúhelníku s odvěsnami $a$, $b$ a přeponou $c$:
>
> $$
> a^2 + b^2 = c^2
> $$
>
> Čtverec nad přeponou má stejný obsah jako oba čtverce nad odvěsnami dohromady.

Těžnice spojuje vrchol se středem protilehlé strany. Těžiště (průsečík těžnic) dělí každou těžnici v poměru 2:1, delší díl přiléhá k vrcholu. Výška je kolmice z vrcholu na protilehlou stranu. Střední příčka spojuje středy dvou stran, je rovnoběžná se třetí stranou a má poloviční délku.

Rovnostranný trojúhelník o straně $a$ má výšku $v = a\sqrt{3}/2$ a obsah $S = a^2\sqrt{3}/4$. Výška plyne z Pythagorovy věty v polovině trojúhelníku: odvěsny $v$ a $a/2$, přepona $a$.

### Kružnice opsaná a vepsaná

Každému trojúhelníku lze opsat i vepsat kružnici. Pro obecný trojúhelník o stranách $a$, $b$, $c$, obsahu $S$ a obvodu $o$:

$$
R = \dfrac{abc}{4S} \qquad r = \dfrac{2S}{o}
$$

Pro pravoúhlý trojúhelník s přeponou $c$ platí $R = c/2$ (Thaletova věta: přepona je průměrem opsané kružnice) a $r = (a+b-c)/2$.

> [!POZOR] $R$ a $r$ se liší řádově: u trojúhelníku 3-4-5 je $R = 2{,}5$, ale $r = 1$. SCIO rádo nabízí opsaný poloměr v úloze na vepsaný.

### Euklidovy věty

Výška $v$ na přeponu ji dělí na úseky $p$ a $q$. Vzniklé dva malé trojúhelníky jsou podobné s celým (stejné úhly), a z podobnosti plynou vztahy:

$$
v^2 = pq \qquad a^2 = cp \qquad b^2 = cq
$$

kde $c = p + q$ je přepona a $a$ je odvěsna přilehlá k úseku $p$. Výška je tedy geometrický průměr úseků přepony.

Heronův vzorec dává obsah ze tří stran ($s$ je poloviční obvod):

$$
s = \dfrac{a+b+c}{2} \qquad S = \sqrt{s(s-a)(s-b)(s-c)}
$$

## Shodnost a podobnost

Shodné útvary mají stejný tvar i velikost. Trojúhelník je jednoznačně určen větami sss, sus a usu — u věty sus musí být úhel mezi danými stranami.

> [!POZOR] Úhel proti jedné z daných stran (případ ssu) jednoznačnost nedává: sinová věta pak má dvě řešení, ostré i tupé, a existují dva různé trojúhelníky. Tři úhly samy určují jen tvar (podobnost), velikost může být libovolná.

Podobné útvary mají stejný tvar, liší se měřítkem $k$ (koeficient podobnosti).

> [!VETA] Jsou-li si dva útvary podobné s koeficientem $k$, pak poměr délek je $k$ a poměr obsahů je $k^2$.

Úsečka rovnoběžná se stranou trojúhelníku odřezává menší trojúhelník podobný s celým. Odřezek s koeficientem $k = 1/3$ má obsah $1/9$ celku a na zbytek (lichoběžník) zbývá $8/9$.

> [!POZOR] Poměr obsahů není $k$, ale $k^2$. A hlídej, k čemu se poměr vztahuje: poměr odřezku k celku ($1/9$) není totéž co poměr odřezku ke zbytku ($1/8$).

## Mnohoúhelníky

Součet vnitřních úhlů $n$-úhelníku je $(n-2) \cdot 180°$: mnohoúhelník se rozpadá na $n-2$ trojúhelníků. Počet úhlopříček je $n(n-3)/2$: z každého vrcholu vede úhlopříčka do $n-3$ vrcholů (ne do sebe ani do sousedů) a každá má dva konce.

Pravidelný šestiúhelník se skládá ze 6 rovnostranných trojúhelníků: strana šestiúhelníku se rovná poloměru opsané kružnice.

| Útvar | Obsah | Poznámka |
|---|---|---|
| trojúhelník | $S = av/2$ | $v$ je výška ke straně $a$ |
| obdélník | $S = ab$ | čtverec: $S = a^2$ |
| kosočtverec | $S = u_1u_2/2$ | úhlopříčky jsou kolmé |
| lichoběžník | $S = (a+c)v/2$ | $a$, $c$ jsou základny |

Úhlopříčky kosočtverce se půlí a jsou kolmé: stranu dopočítáš Pythagorovou větou z jejich polovin. U rovnoramenného lichoběžníku spočítej převis základny $(a-c)/2$ a výšku opět Pythagorovou větou z ramene.

## Kružnice a kruh

Kružnice je množina bodů se vzdáleností $r$ od středu; kruh jsou body se vzdáleností nejvýš $r$. Pro poloměr $r$ a průměr $d$:

$$
o = 2\pi r = \pi d \qquad S = \pi r^2
$$

Kruhová výseč se středovým úhlem $\alpha$ tvoří podíl $\alpha/360°$ celého kruhu:

$$
l = \dfrac{\alpha}{360°} \cdot 2\pi r \qquad S = \dfrac{\alpha}{360°} \cdot \pi r^2
$$

> [!POZOR] Obsah škáluje s $r^2$, délka oblouku jen s $r$. U výsečky s $r = 6$ a úhlem $120°$ je obsah $12\pi$, ale oblouk jen $4\pi$ — záměna je klasický distraktor.

Obvodový úhel je polovina středového nad stejným obloukem. Thaletova věta: úhel nad průměrem je pravý. Kolmice ze středu půlí tětivu: vzdálenost tětivy od středu, polovina tětivy a poloměr tvoří pravoúhlý trojúhelník.

## Trigonometrie v trojúhelníku

V pravoúhlém trojúhelníku s ostrým úhlem α: sinus je protilehlá / přepona, kosinus je přilehlá / přepona, tangens je protilehlá / přilehlá. Pro obecný trojúhelník platí dvě věty.

> [!VETA] Sinová věta — poměr stran se rovná poměru sinů protilehlých úhlů:
>
> $$
> \dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma}
> $$

> [!VETA] Kosinová věta (pro pravý úhel přechází v Pythagorovu větu):
>
> $$
> c^2 = a^2 + b^2 - 2ab\cos\gamma
> $$
>
> a cyklicky pro ostatní strany.

Obsah ze dvou stran a sevřeného úhlu: $S = ab\sin\gamma/2$. Pozor: vzorec má dvě poloviny, $1/2$ ze vzorce a případně $\sin 30° = 1/2$.

Protože $\sin\gamma = \sin(180° - \gamma)$, určuje sinus úhel dvojznačně: zadaný sinus připouští ostrou i tupou variantu a obě musíš ověřit součtem $180°$. Stejná nejednoznačnost stojí za případem ssu u shodnosti.

## Obvody a obsahy

Složený útvar rozlož na základní tvary a sečti (nebo odečti) jejich příspěvky. Pro obvod platí: hrana uvnitř útvaru do obvodu nepatří. Půlkruh přiložený na stranu čtverce tak nahradí jednu stranu obloukem o délce $\pi r$.

Kruh vepsaný do čtverce o straně $a$ má poloměr $r = a/2$ a poměr obsahů kruh : čtverec je $\pi/4$. Výsledek nezávisí na $a$ — strana se vykrátí.

> [!POZOR] U složených útvarů si nakresli, které hrany zůstávají na hranici. Nejčastější chyba je přičíst oblouk a zapomenout odečíst překrytou stranu.

## Typové úlohy SCIO k planimetrii

- **Pythagorova věta v převleku.** Výška rovnostranného trojúhelníku, rameno lichoběžníku, strana kosočtverce, vzdálenost tětivy — všude hledej pravoúhlý trojúhelník a správně přiřaď přeponu. Nástroj: náčrtek s vyznačenou pravouhlostí.
- **Trojúhelníková nerovnost.** Která trojice tvoří trojúhelník; degenerovaný případ s rovností. Nástroj: nerovnost musí být ostrá.
- **Poměry u podobnosti.** Délky $k$-krát, obsahy $k^2$-krát; odřezek vs. zbytek. Nástroj: koeficient vždy vztažený k celku, pak dopočet zbytku.
- **Euklidovy věty.** Výška z úseků přepony je geometrický průměr. Nástroj: $v^2 = pq$, úseky se násobí.
- **Úhly mnohoúhelníků.** Součet $(n-2) \cdot 180°$, počet úhlopříček $n(n-3)/2$. Nástroj: rozpad na trojúhelníky, dělení dvěma u úhlopříček.
- **Kružnice: poloměr vs. průměr.** Z obvodu nejdřív poloměr, pak obsah. Nástroj: $r = d/2$ napsat explicitně před dosazením.
- **Výseč: obsah vs. oblouk.** Stejný podíl, jiná mocnina $r$. Nástroj: obsah přes $r^2$, oblouk přes $r$.
- **Sinová a kosinová věta.** Přímé dosazení + znaménko u členu $2ab\cos\gamma$. Nástroj: po dosazení zkontroluj, zda výsledek dává geometrický smysl (strana kratší než součet zbylých dvou).
- **Heronův vzorec.** Obsah ze tří stran, když trojúhelník není pravoúhlý. Nástroj: poloviční obvod $s$, pak odmocnina ze čtyř činitelů.
- **Složené obvody.** Vnější hrany ano, vnitřní ne. Nástroj: projít hranici prstem po náčrtku.

## Řešené příklady

### Příklad 1

**Zadání:** Vnitřní úhly trojúhelníku jsou v poměru 2:3:4. Jak velký je největší úhel?

**Řešení:**

1. Poměr převedeme na díly: celkem $2 + 3 + 4 = 9$ dílů a součet úhlů je $180°$, takže jeden díl je $20°$.
2. Největšímu úhlu odpovídá největší číslo v poměru:

   $$
   4 \cdot 20° = 80°
   $$

3. Kontrola: $40° + 60° + 80° = 180°$. Chyba by byla dělit třemi (počtem úhlů) místo devíti.

### Příklad 2

**Zadání:** Výška na přeponu dělí přeponu pravoúhlého trojúhelníku na úseky 4 a 9. Jak dlouhá je tato výška?

**Řešení:**

1. Úseky přepony a výška na ni ukazují na Euklidovu větu o výšce — aritmetický průměr by byla chyba, úseky se násobí:

   $$
   v^2 = 4 \cdot 9 = 36
   $$

2. Výška je kladná:

   $$
   v = 6
   $$

3. Kontrola řádu: výška 6 leží mezi úseky 4 a 9, což u geometrického průměru sedí.

### Příklad 3

**Zadání:** V trojúhelníku ABC je úsečka DE rovnoběžná se stranou AB (D na AC, E na BC) a platí CD:DA = 1:2. V jakém poměru je obsah trojúhelníku CDE k obsahu lichoběžníku ABED?

**Řešení:**

1. Rovnoběžka odřezává podobný trojúhelník. Koeficient vztáhneme k celku: CD je třetina CA, takže $k = 1/3$. (Krok, kde se nejčastěji chybuje: poměr 1:2 není koeficient, koeficient je 1:3.)
2. Obsahy jsou v poměru $k^2$:

   $$
   \dfrac{S_{CDE}}{S_{ABC}} = \left(\dfrac{1}{3}\right)^2 = \dfrac{1}{9}
   $$

3. Lichoběžník je zbytek celku: $1 - 1/9 = 8/9$. Hledaný poměr je proto $1/9 : 8/9$, tedy 1:8.

### Příklad 4

**Zadání:** Trojúhelník má strany 13, 14 a 15. Jaký je jeho obsah?

**Řešení:**

1. Nejprve test pravoúhlosti: $13^2 + 14^2 = 365$ není $15^2 = 225$, takže vzorec odvěsna krát odvěsna děleno dvěma neplatí. Volíme Heronův vzorec.
2. Poloviční obvod:

   $$
   s = \dfrac{13 + 14 + 15}{2} = 21
   $$

3. Dosazení a úprava před odmocněním (hledáme čtverce):

   $$
   S = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = \sqrt{7056} = 84
   $$

## Shrnutí vzorců

- součet úhlů trojúhelníku: $180°$
- trojúhelníková nerovnost: $a + b > c$ a cyklicky
- Pythagorova věta: $a^2 + b^2 = c^2$
- těžiště dělí těžnici v poměru 2:1 (delší díl u vrcholu)
- Euklidova věta o výšce: $v^2 = pq$
- Euklidova věta o odvěsně: $a^2 = cp$
- výška rovnostranného trojúhelníku: $v = a\sqrt{3}/2$
- obsah rovnostranného trojúhelníku: $S = a^2\sqrt{3}/4$
- podobnost s koeficientem $k$: délky $k$-krát, obsahy $k^2$-krát
- součet úhlů $n$-úhelníku: $(n-2) \cdot 180°$
- počet úhlopříček: $n(n-3)/2$
- obsah trojúhelníku: $S = av/2$
- Heronův vzorec:

  $$
  S = \sqrt{s(s-a)(s-b)(s-c)} \qquad s = \dfrac{a+b+c}{2}
  $$

- obsah rovnoběžníku: $S = ab$ pro obdélník
- obsah kosočtverce: $S = u_1u_2/2$
- obsah lichoběžníku: $S = (a+c)v/2$
- obvod kruhu: $o = 2\pi r = \pi d$
- obsah kruhu: $S = \pi r^2$
- výseč s úhlem $\alpha$: podíl $\alpha/360°$ celého kruhu
- obvodový úhel je polovina středového
- Thaletova věta: úhel nad průměrem je pravý
- opsaná kružnice: $R = abc/4S$, u pravoúhlého $R = c/2$
- vepsaná kružnice: $r = 2S/o$
- sinová věta: $a/\sin\alpha = b/\sin\beta = c/\sin\gamma$
- kosinová věta:

  $$
  c^2 = a^2 + b^2 - 2ab\cos\gamma
  $$

- obsah ze dvou stran a úhlu: $S = ab\sin\gamma/2$
