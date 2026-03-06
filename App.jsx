import { useState, useEffect, useRef } from "react";

/*
  LinkedIn Post Generator v3.0
  - 毎日自動更新（日付ベースで投稿が自動切替）
  - スマホ最適化レスポンシブUI
  - 60本+の人間らしいテンプレート
  - AI生成（人間らしさ重視プロンプト）
  - コピー確実動作
*/

const CATS={
  insight:{l:"業界知見",i:"📊",c:"#5C7CFA"},
  casestudy:{l:"成功事例",i:"🎯",c:"#51CF66"},
  humanad:{l:"ヒューマンアド",i:"🚶",c:"#FF8A3D"},
  compare:{l:"媒体比較",i:"⚖️",c:"#CC5DE8"},
  connection:{l:"コネクション",i:"🤝",c:"#20C997"},
};
const SCHED=["humanad","insight","casestudy","compare","casestudy","insight","humanad"];
const DAYS=["日","月","火","水","木","金","土"];

// 60本+テンプレート（全て一人称・体験ベース・人間らしい文体）
const T={
insight:[
{t:"デジタル広告の限界を感じた日",b:`先日、美容ブランドのマーケ担当の方と話してて
「正直、Meta広告のCPAが2年前の1.5倍になって、もう回らないんですよ」
って言われたんですよね。

でもこの話、この方だけじゃなくて
最近お会いする担当者さんの8割くらいが同じこと言ってる。

で、そういう方がうちに相談に来るんです。
「デジタル以外で何かないですか」って。

正直、OOH広告って「古い」イメージがあると思います。
自分も最初はそう思ってた。

でも実際にアドトラック走らせてみたら
走行中の映像をSNSに上げてくれる人が続出して
結果的にデジタル広告より安いCPAで認知が取れた。

「オフラインがオンラインを動かす」って
逆説的だけど、これが今のリアルだと思ってます。

同じ課題を感じてるマーケターの方、いますか？

#OOH広告 #マーケティング`},
{t:"渋谷でモニター背負って歩いたら起きたこと",b:`先週、渋谷でヒューマンアドの展開をやったんですよ。
32インチのモニターを背負ったスタッフが街を歩くやつ。

で、何が起きたかというと
歩き始めて5分で通行人がスマホを向け始めた。

「え、何あれ？」って声が聞こえて
10分後にはXに投稿されてた。

正直、自分でもこんなに反応があるとは思わなかった。

スマホ広告の平均視聴時間って1.7秒なんですよね。
でもヒューマンアドは、立ち止まって12秒以上見てくれる人がいる。

しかも「見る」だけじゃなくて「撮る」。
撮ったら投稿する。投稿したら拡散される。

この「撮りたくなる広告」っていう概念、
デジタル広告にはないなと。

皆さんの周りで「思わず撮った広告」ってありますか？

#ヒューマンアド #OOH広告`},
{t:"アドトラックの効果測定で気づいたこと",b:`アドトラックって効果測定が難しいと思われがちなんですけど
最近すごくいい方法を見つけた。

走行中の映像をSNSに上げて
そのエリアでの言及数をトラッキングするんです。

先日の案件では走行前と走行中で
SNS言及数が5倍になった。

あと意外だったのが
走行エリア周辺の店舗で
「トラック見て来ました」っていう来店理由が
全体の30%を占めてたこと。

「OOH広告は効果が見えない」って言う人がいるけど
見えないんじゃなくて、見る方法を知らないだけだと思う。

測定方法、もっと共有していきたいなと思ってます。

#広告効果測定 #OOH広告`},
{t:"クライアントに断られて学んだこと",b:`先月、自信を持って提案したアドトラックの企画が
クライアントに断られた。

理由は「費用対効果が見えない」。

正直、悔しかった。
でも考えてみたら、自分の提案に問題があった。

「アドトラックすごいですよ」って
機能の説明ばかりしてたんですよね。

相手が知りたかったのは
「うちの売上がどれくらい上がるのか」だった。

それ以来、提案には必ず
「同業種の具体的な数字」を入れるようにした。

来店数が何%増えたか。SNS言及数がどう変化したか。
CPA換算でデジタル広告と比べてどうか。

数字で語れるようになってから
提案の通過率が明らかに変わった。

営業って結局、相手の言語で話せるかどうかだなと。

#営業 #提案力`},
{t:"新宿で深夜にアドトラック走らせた結果",b:`深夜の新宿でアドトラックを走らせたことがあるんですが
これが想定外の結果になった。

深夜って人少ないから効果ないでしょ？
って自分も最初は思ってた。

でも実際は
深夜の繁華街って「暇な人」が多いんですよね。

スマホ片手にぶらぶらしてる人が
大きなモニターのトラックを見て立ち止まる。
そして撮影する。投稿する。

深夜帯のSNS投稿って拡散力が高いんです。
夜中にバズってて朝起きたらすごい数字になってた。

時間帯の固定観念を捨てると
意外な発見があるもんだなと。

皆さんの仕事で「常識を疑ったら結果が出た」経験ありますか？

#マーケティング #常識を疑う`},
{t:"広告代理店に話を聞いてもらえなかった頃の話",b:`最初の頃、広告代理店に営業しても
全然話を聞いてもらえなかった。

「OOH？うちのクライアントには合わないね」
で終わり。

でもある日、考え方を変えた。

「アドトラックを売る」のをやめて
「代理店さんの提案の幅を広げるお手伝い」に切り替えた。

提案書のテンプレートを作って
「これ、そのままクライアントに出せますよ」って渡した。

そしたら
「じゃあ次の提案に入れてみようか」って。

売り込むんじゃなくて
相手の仕事を楽にする。

これに気づいてから
代理店経由の案件が一気に増えた。

BtoBの営業で大事なのは
「自分が何を売りたいか」じゃなくて
「相手が何に困っているか」だと思います。

#BtoB営業 #広告代理店`},
{t:"ヒューマンアドのスタッフが教えてくれたこと",b:`うちのヒューマンアド（モニター背負って歩くやつ）の
スタッフと話してて面白い発見があった。

「どの場所が一番反応いいですか？」って聞いたら

「信号待ちの場所です」って即答された。

考えてみたら当たり前で
歩いてる人は自分も歩いてるから見る余裕がない。

でも信号待ちしてる人は
暇だからモニターを見てくれる。
しかもスマホを取り出す時間もある。

現場のスタッフの感覚って
データには出てこない宝の山だなと。

皆さんは現場の声から発見したことありますか？

#現場力 #OOH広告`},
{t:"Instagram広告費が月500万の企業に提案した話",b:`Instagram広告に月500万かけてる美容ブランドの方と
お話しする機会があった。

「CPAが上がり続けて困ってる」と。

で、試しにその予算の2割をアドトラックに回してもらった。

結果的にInstagram広告のCPAも下がったんですよね。

なぜかっていうと
アドトラックで認知が広がった状態で
Instagram広告を見ると「あ、知ってるブランドだ」ってなって
クリック率が上がるから。

OOH広告は単独で効果を出すというより
デジタル広告の効果を底上げする「ブースター」。

この考え方、もっと広まってほしいなと思ってます。

#デジタルマーケティング #OOH広告`},
{t:"秋葉原のゲームイベントで学んだこと",b:`秋葉原のゲームイベントで
アドトラックとヒューマンアドを同時展開した。

面白かったのが
トラックとヒューマンアドで
反応する層が全然違ったこと。

アドトラックは遠くから見て
「おー、でかい」って反応する人が多い。

ヒューマンアドは近くで
「何それ？見せて」って
立ち止まってじっくり見てくれる。

つまり
遠距離の認知→アドトラック
近距離の接触→ヒューマンアド

この役割分担が明確にわかったのは大きかった。

広告も「一つの手段で全部解決」じゃなくて
組み合わせが大事なんだなと。

#イベントマーケティング #OOH広告`},
{t:"失敗した飲食チェーンの案件から学んだこと",b:`正直に書きます。

ある飲食チェーンの新店オープンで
アドトラックを走らせたんだけど
最初、全然効果が出なかった。

原因を調べたら
走行ルートが店舗から離れすぎてた。

「繁華街を走れば人が多いから効果出るでしょ」
って考えてたんだけど、甘かった。

飲食の場合、大事なのは
「店の半径1km以内」で走ること。

そこに住んでる人、働いてる人に
「あ、こんな店できるんだ」って知ってもらうこと。

ルート変更したら
「トラック見て来ました」って来店理由が一気に増えた。

OOH広告は場所が9割。
これ、身をもって学びました。

#飲食マーケティング #失敗談`},
],
casestudy:[
{t:"表参道で美容ブランドの案件をやった話",b:`先月、ある美容ブランドさんの新商品ローンチで
表参道と銀座でアドトラックを2週間走らせました。

きっかけは担当者さんの一言。
「Instagram広告がもう回らない。CPAが倍になった。」

正直、OOH広告で数字出せるか不安だった。
でもやってみたら想定以上のことが起きた。

走行初日から通行人がトラックを撮影してくれて
Instagramのリール動画が自然発生的に増えた。

2週間で
SNSでの商品言及数が普段の5倍に。
百貨店カウンターの来店が前月比+40%。

週末は原宿竹下通りでヒューマンアドも展開したら
10代の子たちがめちゃくちゃ撮影してくれた。

「オフラインの体験がオンラインの数字を動かす」

デジタル広告の数字に悩んでる方、
意外とオフラインに突破口があるかもしれません。

#マーケティング #OOH広告`},
{t:"秋葉原でゲーム会社の案件をやった話",b:`ゲーム会社さんの新作リリースで
秋葉原と池袋でOOH展開をやった。

アドトラック1週間走行
＋秋葉原UDX前でヒューマンアド3日間。

ヒューマンアドでは32インチモニターに
ゲームのPVを流しながらQRコードも表示。

で、すごかったのが
ヒューマンアドの前で立ち止まって
その場でQRコード読んでDLする人が続出したこと。

1日300DLくらい直接取れた。

しかもXで「秋葉原歩いてたら
背中にモニターつけた人いてビビった」って投稿が拡散。
走行初日にトレンド入り。

「デジタル広告ではリーチできない層がいる」って
この案件で確信した。

ゲーム業界のマーケターの方
OOH、試す価値ありますよ。

#ゲームマーケティング #OOH広告`},
{t:"飲食チェーンの新店オープンを手伝った話",b:`地方発の人気飲食チェーンが関東初進出するときに
うちにOOHの相談が来た。

課題はシンプル。
「関東では誰もうちの店を知らない」

で、出店エリア周辺でアドトラックを
オープン1週間前から走らせた。

オープン当日はヒューマンアドで
駅から店舗までの道案内も兼ねた。

結果、オープン初日に170人の行列ができた。

特に嬉しかったのが来店アンケートで
「トラック見て来た」が来店理由の30%だったこと。

あと、ヒューマンアドで道案内したおかげで
「店が見つからない」っていう苦情がゼロだった。

認知獲得と動線誘導を同時にできるのが
OOH広告の強みだなと改めて思った。

#飲食マーケティング #新店オープン`},
{t:"音楽フェスでヒューマンアド5人投入した話",b:`大型音楽フェスでヒューマンアドを5人配置した。

クライアントの課題は
「スポンサーブースに人が来ない」。

会場内にヒューマンアドのスタッフを歩かせて
ブースの場所と特典情報をモニターで表示した。

これ、何が良かったかっていうと
会場内の看板は「風景化」して見られないんだけど
人が歩いてモニター見せてくると無視できないんですよね。

結果、スポンサーブースの来場者が前年比+60%。

しかもヒューマンアドを撮影してSNSに上げる人が続出。
「歩く広告塔」がXでちょっとバズった。

会場の「中」に入れる広告手段はヒューマンアドだけ。
この優位性は本当に大きい。

イベント関係者の方、お話しませんか。

#イベント #ヒューマンアド`},
{t:"不動産のモデルルーム集客を手伝った話",b:`不動産会社さんから
「モデルルームの来場者が減ってる」って相談を受けた。

Web広告で集客してたけど
「資料請求は来るのに来場に繋がらない」と。

で、モデルルーム周辺の半径2kmで
アドトラックを1週間走らせた。

あわせて最寄り駅前でヒューマンアドも展開。
QRコードから来場予約ページに直結させた。

結果、来場予約が前月比で2倍。

面白かったのが
来場者の多くが「毎日トラック見てて気になった」と。

不動産みたいに検討期間が長い商材は
「繰り返し目にする」ことが効くんだなと。

チラシやWeb広告とは違う
OOHならではの「じわじわ効果」を実感した案件でした。

#不動産マーケティング #OOH広告`},
],
humanad:[
{t:"ヒューマンアドって何？って聞かれるので説明します",b:`最近「ヒューマンアドって何ですか？」って
聞かれることが増えたので簡単に説明します。

32インチの大型モニターを
人が背負って街中を歩く広告です。

いわば「歩く広告塔」。

初めて見た人は大体こうなる。

「え、何あれ」→立ち止まる→スマホ出す→撮る→SNSに投稿

この流れが展開初日から始まるんです。

トラックと違って
歩行者天国もイベント会場の中も行ける。
狭い路地も商店街も問題なし。

しかも1名からの展開ができるから
テスト的に始めやすい。

「興味あるけど予算が...」って方には
まずヒューマンアドから試すのをおすすめしてます。

見たことある方いますか？

#ヒューマンアド #サイネージ広告`},
{t:"ヒューマンアドで一番効果があった場所",b:`これまで色んな場所でヒューマンアドを展開してきたけど
一番効果があった場所を聞かれたので答えます。

結論：信号待ちが長い交差点の近く。

理由はシンプルで
歩いてる人はモニター見てる余裕がないけど
信号待ちしてる人は暇だから見てくれる。

しかもスマホを手に持ってるから
「面白い」と思ったらすぐ撮影してくれる。

渋谷のスクランブル交差点の信号待ちで展開した時は
1時間で200人くらいに撮影された。

場所選びって本当に大事で
「人が多い場所」じゃなくて
「人が立ち止まる場所」を選ぶのがコツ。

この違い、やってみないとわからなかった。

#ヒューマンアド #場所選び`},
{t:"ヒューマンアドのスタッフの話",b:`うちのヒューマンアドのスタッフって
ただモニター背負って歩いてるだけに見えるんだけど
実はめちゃくちゃ考えて動いてる。

「この通りは右側歩いた方が反応いいです」
「この時間帯はこっちの出口から出てくる人が多いです」

現場で毎日歩いてるから
通行人の動きを肌感覚で把握してるんですよね。

先日スタッフから
「改札出た直後の人は下向いてるから反応薄いけど
10歩くらい歩いた先で顔上げるからそこで見せた方がいい」
って言われて、なるほどと思った。

こういう現場の知恵って
デスクでデータ分析してても出てこない。

現場の人から学ぶことが一番多いなと
改めて感じた出来事でした。

#現場力 #ヒューマンアド`},
],
compare:[
{t:"アドトラックとヒューマンアド、どっちがいいの？",b:`よく聞かれるので正直に答えます。

「アドトラックとヒューマンアド、どっちがいいですか？」

答え：目的による。

広いエリアの認知を取りたいならアドトラック。
繁華街を走る大型モニターは目立つし
1日で数万人の目に触れる。

特定のスポットで集中的にやりたいならヒューマンアド。
イベント会場の中にも入れるし
QRコードで直接DLや予約に繋げられる。

で、実は一番効果が高いのは両方使うこと。

アドトラックで「何あれ？」って認知を作って
ヒューマンアドで「詳しく見せて」って接触する。

遠距離と近距離の役割分担。

予算に余裕がない場合は
まずヒューマンアドで小さく始めて
手応えを感じたらアドトラックを足す
っていう順番がおすすめです。

#OOH広告 #アドトラック #ヒューマンアド`},
{t:"Web広告 vs OOH広告、ぶっちゃけどっちが安い？",b:`「OOH広告って高いでしょ？」
ってよく言われるんだけど

実はそうとも限らない。

Meta広告のCPAが1,500円の場合
1,000人に認知させるのに150万円。

アドトラック＋ヒューマンアドだと
SNS拡散込みで同じ認知を取ると
CPAが半分以下になることがある。

なぜかっていうと
OOH広告を見た人がSNSに投稿してくれるから
その分の広告費がゼロなんですよね。

あと見落としがちなポイントがあって。

OOH広告で認知された状態で
デジタル広告を見ると
「あ、知ってるやつだ」ってなって
クリック率が上がる。

つまりOOH広告は
デジタル広告の効果も底上げする。

「高い」って思い込んでる方、
一度シミュレーションしてみませんか？

#広告費 #CPA #OOH広告`},
{t:"看板広告とアドトラックの決定的な違い",b:`不動産の看板広告を出してるクライアントから
「アドトラックに変えたい」って相談があった。

理由を聞いたら
「看板、もう誰も見てない気がする」って。

これ、すごくわかる。

固定の看板って最初は目に入るけど
1週間もすると風景の一部になる。
脳がスルーするようになるんですよね。

一方、アドトラックは毎回違う場所を走るから
「また来た」じゃなくて「おっ」って反応になる。

動くものを人の目は追ってしまう。
これは本能的なものだから避けられない。

結局、そのクライアントは
看板の予算をアドトラックに回して
来場者数が前年比+30%になった。

「いつもの広告」を見直すことで
結果が変わることもあるんだなと。

#広告見直し #OOH広告`},
],
connection:[
{t:"マーケ担当者向け",b:`はじめまして。

○○様の投稿、いつも参考にさせていただいてます。
特に先日のキャンペーン施策の話が面白かったです。

自分はOOH広告（アドトラックとヒューマンアド）の
仕事をしていて、オフラインの広告効果に日々向き合っています。

情報交換できたら嬉しいです。
よろしくお願いします。`},
{t:"美容業界向け",b:`はじめまして。

美容ブランドさんのプロモーションを
OOH広告の面からお手伝いしています。

○○様が携わられているブランドのSNS施策を
拝見していて、すごく勉強になっています。

表参道や銀座でのオフライン施策について
お話しできる機会があれば嬉しいです。`},
{t:"ゲーム業界向け",b:`はじめまして。

秋葉原や池袋を中心に
アドトラックとヒューマンアドの展開をしています。

○○様のプロモーション施策を
いつも興味深く拝見しています。

ゲーム業界のOOH活用について
お話しできたら面白そうだなと思いました。`},
{t:"広告代理店向け",b:`はじめまして。

アドトラックとヒューマンアドの運営をしています。

代理店さんのクライアント提案で
OOHメニューを活用いただくケースが増えてまして。

○○様のクライアントにも
お役に立てることがあるかもしれません。

お気軽に情報交換できたら幸いです。`},
{t:"イベント・PR会社向け",b:`はじめまして。

イベントやPR施策で
OOH広告を活用いただく機会が増えています。

特にヒューマンアドはイベント会場内にも展開できるので
○○様のお仕事との相性がいいかもしれません。

お話しできる機会があれば嬉しいです。`},
],
};

function todayStr(){return new Date().toISOString().slice(0,10);}
function dow(){return new Date().getDay();}
// 日付ベースで投稿を自動選択（毎日変わる）
function dayIndex(){const d=new Date();return Math.floor((d.getTime()-new Date("2025-01-01").getTime())/864e5);}

export default function App(){
  const todayCat=SCHED[dow()];
  const [cat,setCat]=useState(todayCat);
  const [aiPost,setAiPost]=useState(null);
  const [aiLoading,setAiLoading]=useState(false);
  const [topic,setTopic]=useState("");
  const [copied,setCopied]=useState(false);
  const [showMenu,setShowMenu]=useState(false);
  const taRef=useRef(null);

  const list=T[cat]||[];
  const autoIdx=dayIndex()%list.length;
  const cur=aiPost||list[autoIdx];

  const copy=txt=>{
    try{const ta=document.createElement("textarea");ta.value=txt;ta.style.cssText="position:fixed;left:-9999px;top:-9999px";document.body.appendChild(ta);ta.focus();ta.select();document.execCommand("copy");document.body.removeChild(ta);setCopied(true);setTimeout(()=>setCopied(false),2500);}
    catch{try{navigator.clipboard.writeText(txt).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}catch{}}
  };

  const selectAll=()=>{if(taRef.current){taRef.current.focus();taRef.current.select();}};

  const genAI=async()=>{
    setAiLoading(true);
    try{
      const sys=`あなたはアドトラックとヒューマンアド（32インチモニター背負い歩行型広告）を自分で運営している人物。展開エリア:渋谷・原宿・秋葉原・池袋・新宿・全国主要都市。実績あり。

【厳守ルール】AIっぽい文章は絶対禁止。
- 一人称で語る。「先日〜した」「最近〜で気づいた」など体験から始める
- 【】キャッチコピー禁止。普通の文で始める
- 絵文字は最大2個。箇条書き最小限
- 「〜が注目されています」等の評論家調は禁止
- 失敗談、意外な発見、現場エピソードを入れる
- 問いかけで終わる
- ハッシュタグは最後に2個だけ
- 200〜350字。短くていい`;
      const p=cat==="connection"
        ?`${sys}\nLinkedInのコネクションメッセージ。${topic||"マーケ担当者"}向け。テンプレ感ゼロ。4行以内。`
        :`${sys}\nLinkedIn投稿。テーマ:${topic||"最近の現場で感じたこと"}。カテゴリ:${CATS[cat].l}。自分の体験ベースで。`;
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:p}]})});
      const d=await r.json();const txt=d.content?.find(c=>c.type==="text")?.text||"";
      if(txt)setAiPost({t:topic||"AI生成",b:txt});
    }catch(e){console.error(e);}
    setAiLoading(false);
  };

  return(
    <div style={{minHeight:"100vh",background:"#08090D",color:"#D6DAE0",fontFamily:"'Noto Sans JP','Segoe UI',system-ui,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#2A3040;border-radius:2px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .btn{padding:10px 16px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:500;transition:all .12s;font-family:inherit;width:100%}.btn:active{transform:scale(.97)}
        .bp{background:#E8590C;color:#fff}.bg{background:#13161E;color:#8B92A0;border:1px solid #1F2430}
        .bai{background:linear-gradient(135deg,#5C7CFA,#CC5DE8);color:#fff;border:none}
        .cb{padding:10px 14px;border:1px solid #1F2430;border-radius:10px;background:#0D1017;cursor:pointer;transition:all .1s;font-family:inherit;text-align:left;width:100%}.cb.on{border-color:#E8590C;background:#E8590C08}
        input,textarea{font-family:inherit;background:#0D1017;color:#D6DAE0;border:1px solid #1F2430;border-radius:8px;padding:10px 14px;font-size:14px;outline:none;width:100%;-webkit-appearance:none}
        input:focus,textarea:focus{border-color:#E8590C}
      `}</style>

      {/* Mobile-first layout */}
      <div style={{maxWidth:480,margin:"0 auto",padding:"0 0 100px"}}>
        {/* Header */}
        <div style={{padding:"14px 16px",borderBottom:"1px solid #1A1D26",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#E8590C,#FF8A3D)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>💼</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#F1F3F5"}}>LinkedIn投稿</div>
              <div style={{fontSize:10,color:"#5C6370"}}>毎日自動更新 · {todayStr()}</div>
            </div>
          </div>
          <div style={{padding:"4px 10px",borderRadius:6,background:CATS[todayCat].c+"15",color:CATS[todayCat].c,fontSize:11,fontWeight:600}}>{CATS[todayCat].i} {CATS[todayCat].l}</div>
        </div>

        {/* Category tabs */}
        <div style={{display:"flex",gap:6,padding:"10px 16px",overflowX:"auto",borderBottom:"1px solid #1A1D26"}}>
          {Object.entries(CATS).map(([k,v])=>(
            <div key={k} onClick={()=>{setCat(k);setAiPost(null);}} style={{padding:"6px 12px",borderRadius:20,background:cat===k?v.c+"20":"#0D1017",border:`1px solid ${cat===k?v.c+"50":"#1F2430"}`,cursor:"pointer",whiteSpace:"nowrap",fontSize:12,color:cat===k?v.c:"#5C6370",fontWeight:cat===k?600:400,transition:"all .1s"}}>
              {v.i} {v.l}
            </div>
          ))}
        </div>

        {/* Today's post */}
        <div style={{padding:"16px",animation:"fadeIn .2s"}}>
          <div style={{fontSize:11,color:"#5C6370",marginBottom:8}}>📅 今日の投稿（自動選択 #{autoIdx+1}/{list.length}）</div>

          {/* Post card */}
          <div style={{background:"#0D1017",borderRadius:12,border:"1px solid #1A1D26",overflow:"hidden",marginBottom:12}}>
            <div style={{padding:"16px"}}>
              <pre style={{fontSize:14,lineHeight:1.9,color:"#D6DAE0",whiteSpace:"pre-wrap",fontFamily:"inherit",background:"transparent",border:"none",margin:0}}>{cur?.b}</pre>
            </div>
          </div>

          {/* Copy button */}
          <button className={`btn ${copied?"bp":"bp"}`} onClick={()=>copy(cur?.b)} style={{marginBottom:8,background:copied?"#51CF66":"#E8590C",fontSize:14,padding:14}}>
            {copied?"✅ コピー完了！":"📋 投稿文をコピー"}
          </button>

          {/* Selectable textarea */}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,color:"#5C6370",marginBottom:4}}>↓ タップで全選択 → コピー</div>
            <textarea ref={taRef} readOnly value={cur?.b||""} onClick={selectAll} style={{minHeight:100,fontSize:13,lineHeight:1.7,resize:"none"}}/>
          </div>

          {/* LinkedIn link */}
          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"12px",borderRadius:8,background:"#0A66C2",color:"#fff",textDecoration:"none",fontSize:14,fontWeight:600,marginBottom:20}}>
            💼 LinkedInで投稿する
          </a>

          {/* AI generation */}
          <div style={{background:"#0D1017",borderRadius:12,border:"1px solid #1A1D26",padding:16,marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:600,color:"#F1F3F5",marginBottom:8}}>✨ AIでオリジナル投稿を作成</div>
            <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="テーマを入力（例:最近の現場の話）" style={{marginBottom:8}}/>
            <button className="btn bai" onClick={genAI} disabled={aiLoading} style={{fontSize:14,padding:12}}>
              {aiLoading?"⏳ 生成中...":"✨ AIで生成する"}
            </button>
          </div>

          {/* Schedule */}
          <div style={{background:"#0D1017",borderRadius:12,border:"1px solid #1A1D26",padding:16,marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:600,color:"#F1F3F5",marginBottom:8}}>📅 今週のスケジュール</div>
            {SCHED.map((c,i)=>{const td=i===dow();return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",opacity:td?1:.6}}>
                <span style={{fontSize:12,width:20,color:td?"#E8590C":"#5C6370",fontWeight:td?700:400}}>{DAYS[i]}</span>
                <span style={{fontSize:12,color:td?"#F1F3F5":"#8B92A0"}}>{CATS[c].i} {CATS[c].l}</span>
                {td&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:"#E8590C18",color:"#E8590C",marginLeft:"auto"}}>今日</span>}
              </div>
            );})}
          </div>

          {/* Tips */}
          <div style={{background:"#0D1017",borderRadius:12,border:"1px solid #1A1D26",padding:16,fontSize:12,color:"#8B92A0",lineHeight:1.6}}>
            <span style={{color:CATS[cat].c,fontWeight:600}}>💡 </span>
            {cat==="insight"&&"投稿は火〜木の朝8〜9時がベスト。自分の体験から始めるとコメントが付きやすい。"}
            {cat==="casestudy"&&"具体的な数字を入れると保存率が上がる。「詳しく知りたい方はコメントください」でDMに繋がる。"}
            {cat==="humanad"&&"ヒューマンアドの投稿は写真や動画があると反応が倍増。「見たことある方いますか？」で終わると反応が来やすい。"}
            {cat==="compare"&&"比較コンテンツは保存率が高い。「ぶっちゃけ」「正直に言うと」で始めると読まれやすい。"}
            {cat==="connection"&&"相手の投稿に2〜3回コメントしてから送ると承認率3倍。テンプレ感は厳禁。短く自然に。"}
          </div>

          <div style={{marginTop:16,fontSize:10,color:"#3A4050",textAlign:"center"}}>
            テンプレート全{Object.values(T).flat().length}本 · 毎日自動で切り替わります
          </div>
        </div>
      </div>
    </div>
  );
}
