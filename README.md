# BitWeather
### BitWeatherとは
まず初めに、本ツールはMacOS限定です。<br>
Macのメニューバーに、現在地及び、指定の住所での天気予報を表示します。

<img src="https://raw.githubusercontent.com/noriyuki-shimizu/images/master/BitWeather_v0.0.1.gif" width="400px">

### バージョン
* 1.0.0

### 開発言語
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
すると、メニューバーに`BitBar`と表示されているはずです。<br><br>
<img src="https://user-images.githubusercontent.com/31028330/52277096-2fc8cc80-2997-11e9-8915-aa1d03272573.png" width="500px">

### ipinfo.io  
* ipinfo.ioとは<br>
ユーザーの所在地を特定し、ユーザー体験(UX)を変更できます。<br>
また、詐欺を防止し、コンプライアンスを確実にするなど、さまざまなことができます。<br>
10万人以上の企業や開発者から信頼されています。<br><br>
* API tokenの発行(※現在地の天気を表示したい場合のみ)<br>
以下のリンクから公式ページへアクセスし「SIGN UP」から、アカウント登録します。<br>
Git Hubとも連携できるため、簡単に登録できます。<br>
登録完了すると、API Tokenが発行できているはずです。<br><br>
[ipinfo.io 公式ページ](https://ipinfo.io/)<br>
<img src="https://user-images.githubusercontent.com/31028330/52341612-6f0a2280-2a56-11e9-8268-60b88b87acf9.png">  
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

### Node.js
* Node.jsのshebangについて<br>
本ツールは`/usr/local/bin/`に`node`があることが前提となります。(環境変数を通してあること)<br>
`.bash_profile`などのファイルにおいて、`export`を使用して環境変数を通すやり方だとうまくいかないケースがあるため、注意が必要です。<br>
`node`をインストールした際、`/usr/local/bin/`にnodeが存在しなかった場合は、シンボリックリンクを作成するなどの対応が必要となります。<br>

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
      token: 'Write your ipinfo token here'
tokoro:
  address:
    # If you want to specify an address, please add it below.
    # The following description is an example.
    # home: 'Home address'
    # company: 'Company address'
openweathermap:
  request:
    url: 'http://api.openweathermap.org/data/2.5/forecast'
    get:
      appID: 'Write your API key here'
      cnt: '40'
      units: 'metric'
      mode: 'json'
```

* パッケージ情報のインストール
    * `package.json`に記載されている`dependencies`のパッケージ情報をインストールします。<br>
    プロジェクトのあるディレクトリ上で、以下のコマンドを実行し、セットアップします。
    ```
    $ bash setup.sh
    ```

    * インストールされる情報は以下の通りです。<br>

    ```
    パッケージ名: バージョン
    ------------------------
    fs        :   0.0.1-security,
    http      :   0.0.0,
    https     :   ^1.0.0,
    tokoro    :   ^0.2.1,
    yaml      :   ^1.3.1
    ```

* BitBarのプラグインフォルダを変更<br>
まず、BitBar専用のプラグインフォルダを任意のディレクトリに作成します。<br>
BitBarの「Change Plugin Folder...」から、作成したプラグインフォルダを選択します。<br>
<img src="https://user-images.githubusercontent.com/31028330/52345699-302d9a00-2a61-11e9-81c5-55de1654b828.png" width="500px"><br><br>
* app.1h.jsに実行権限がない場合<br>
本ツールにおけるメイン実行ファイル(app.1h.js)に実行権限がない場合は、プロジェクトのディレクトリ上で以下のコマンドを実行します。
```
$ chmod +x app.1h.js
```
* シンボリックリンクを作成する<br>
最後に、コマンドラインからmain実行ファイル(`app.1h.js`)に対し、作成したプラグインフォルダへシンボリックリンクを作成します。
```
$ ln -s 本ツールをダウンロードしたディレクトリのパス/app.1h.js 作成したプラグインフォルダまでのディレクトリのパス/app.1h.js
```
