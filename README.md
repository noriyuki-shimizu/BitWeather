# BitWeather
### BitWeatherとは
まず初めに、本ツールはMacOS限定です。<br>
Macのメニューバーに、現在地及び、指定の住所での天気予報を表示します。

<img src="https://raw.githubusercontent.com/noriyuki-shimizu/images/master/BitWeather_v0.0.1.gif" width="400px">

### バージョン
* 0.0.1

### 開発環境
* Node.js(v11.6.0)

### 使用ツール
* BitBar(v1.9.2)

### 使用API
* ipinfo.io
* openWeatherMap

### 使用ライブラリ
* tokoro(住所緯度経度変換ライブラリ)

## 準備

### BitBar
* BitBarとは<br>
任意のスクリプトまたはプログラムからの出力をMac OS Xのメニューバーに直接表示できる無料ツールです。<br>
また、cronのように任意の実行感覚でスクリプトなど、処理を実行できます。<br><br>
* インストール<br>
画面からインストールする場合は以下のリンクからインストールしてください。<br><br>
[BitBar 公式ページ](https://getbitbar.com/)<br><br>
コマンドラインからインストールする場合は、以下のコマンドを実行します。<br>

```
$ brew cask install bitbar
```

* 起動<br>
インストールが完了したら、BitBarアプリケーションを起動してください。<br>
すると、メニューバーにBitBarが表示されているはずです。<br><br>
<img src="https://user-images.githubusercontent.com/31028330/52277096-2fc8cc80-2997-11e9-8915-aa1d03272573.png" width="500px">
<br>
### ipinfo.io
* ipinfo.ioとは<br>
ユーザーの所在地を特定し、ユーザー体験(UX)を変更できます。<br>
また、詐欺を防止し、コンプライアンスを確実にするなど、さまざまなことができます。<br>
10万人以上の企業や開発者から信頼されています。<br><br>
* API tokenの発行(※現在地の天気を表示したい場合のみ)<br>
以下のリンクから公式ページへアクセスし「SIGN UP」から、アカウント登録します。<br><br>
[ipinfo.io 公式ページ](https://ipinfo.io/)<br>
<img src="https://user-images.githubusercontent.com/31028330/52341612-6f0a2280-2a56-11e9-8268-60b88b87acf9.png">
Git Hubとも連携できるため、簡単に登録できます。<br>
登録完了すると、API Tokenが発行できているはずです。<br>
<img src="https://user-images.githubusercontent.com/31028330/52341929-52221f00-2a57-11e9-85c9-a3e6ae71a4e7.png" width="500px">

### openWeatherMap
* openWeatherMapとは<br>
Webやモバイルアプリケーションの開発者に、現在の天候や予測履歴を含む各種気象データの無料APIを提供するオンラインサービスです。([wikipedia](https://ja.wikipedia.org/wiki/Openweathermap)参照)<br>
無料プランから有料プランまで色々なサービスが提供されています。<br>
本ツールでは、無料枠で全く問題ありません。<br><br>
* API keyの発行<br>
以下のリンクから公式ページへアクセスし、「How to start in 3 simple steps」の指示に従い、無料枠でのAPI keyを発行します。<br><br>
[How to start](https://openweathermap.org/)<br>
<img src="https://user-images.githubusercontent.com/31028330/52342525-ffe1fd80-2a58-11e9-8bb6-58e73494b9af.png">

### 本ツールのダウンロード
* ダウンロードを行ってください。(使用してみる価値あり！！だと思われます)
* ダウンロードが完了したら、`config/app.yml`を開いていただき、上記で登録したAPI tokenやAPI keyを追加します。<br>
* 住所での天気予報を表示したい場合は、addressの箇所に住所を設定してください。<br>
addressの変換処理では、tokoroライブラリを用いており、こちらのライブラリは国土交通省の公開している[街区レベル位置参照データ](http://nlftp.mlit.go.jp/isj/)を元にしているそうです。<br>

```yaml:app.ylm
ipinfo:
  request:
    url: 'https://ipinfo.io'
    get:
      token: '{your ipinfo token}'
tokoro:
  address:
    # 住所を入力　以下は例
    home: '自宅の住所'
    company: '会社の住所'
openweathermap:
  request:
    url: 'http://api.openweathermap.org/data/2.5/forecast'
    get:
      appID: '{your api key}'
      cnt: '35'
      units: 'metric'
      mode: 'json'
```

* BitBarのプラグインフォルダを変更<br>
まず、BitBar専用のプラグインフォルダを任意のディレクトリに作成します。<br>
BitBarの「Change Plugin Folder...」から、作成したプラグインフォルダを選択します。<br>
<img src="https://user-images.githubusercontent.com/31028330/52345699-302d9a00-2a61-11e9-81c5-55de1654b828.png" width="500px"><br><br>
* シンボリックリンクを作成する<br>
最後に、コマンドラインからmain実行ファイル(`app.1h.js`)に対し、作成したプラグインフォルダへシンボリックリンクを作成します。

```
$ ln -s 本ツールをダウンロードしたディレクトリのパス/app.1h.js 作成したプラグインフォルダまでのディレクトリのパス/app.1h.js
```
