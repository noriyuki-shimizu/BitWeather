# BitWeather
### BitWeatherとは
まず初めに、本ツールはMacOS限定です。<br>
Macのメニューバーに、現在地及び、指定の住所での天気予報を表示します。

<img src="https://raw.githubusercontent.com/noriyuki-shimizu/images/master/BitWeather_v0.0.1.gif" width="400px">

### 開発環境
* Node.js(v11.6.0)

### 使用ツール
* BitBar

### 使用API
* ipinfo.io
* openWeatherMap

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
* Api tokenの発行(※現在地の天気を表示したい場合のみ)<br>
以下のリンクから公式ページへアクセスし「SIGN UP」から、アカウント登録します。<br><br>
[ipinfo.io 公式ページ](https://ipinfo.io/)<br><br>
登録すると、Api Tokenが発行できているはずです。

### openWeatherMap
* openWeatherMapとは<br>
Webやモバイルアプリケーションの開発者に、現在の天候や予測履歴を含む各種気象データの無料APIを提供するオンラインサービスです。([wikipedia](https://ja.wikipedia.org/wiki/Openweathermap)参照)<br>
[無料プランから有料プラン](https://openweathermap.org/price)まで色々なサービスが提供されています。<br>
本ツールでは、無料枠で全く問題ありません。<br><br>
* Api keyの発行<br>




