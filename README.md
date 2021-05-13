[English](README_en.md)
# ZabbixでHPE OneViewを監視するサンプル
OneView APIを使ってイベント情報を収集するサンプルです。

## セットアップ

### アイテムパラメータ
OneViewのイベント情報を収集・パース・フォーマットするためにZabbix上でアイテムを作ってください。パラメータは以下のように設定します。

```
[Parameters in Zabbix Item]
ovEndpoint  =>  https://<OneView IP Addr>
ovUser      =>  <OneView User>
ovPassword  =>  <OneView User Password>
ovVersion   =>  <OneView API version>
```

### スクリプトの設定
スクリプトのサンプルは[こちら](getEvents.js)にあります。
このスクリプトはOneViewからJSON形式でイベントを収集するスクリプトです。そのため、プリプロセッシング機能でフィルター、パース、整形をします。

### プリプロセッシング
#### イベントのフィルター
プリプロセッシングタブから*JSONPATH*機能を使ってCritical/Warningステータスのイベントのみをフィルターできます。

```
$.members[?(@.severity == "Critical" || @.severity == "Warning")]
```

すると、以下のようにフィルターされたイベントが見えます。
![json](docs/json.png)


#### イベントの整形
JSON形式ですと可読性が悪いと思います。そこで、[このスクリプト](preprocessing_format.js)を使ってシンプルなテキストに整形します。
![text](docs/text.png)

ZabbixでJSON内のリストを１つずつのイベントエントリとして挿入する方法を探しましたが見つかりませんでした。もしご存知の方が情報の共有をお願いいたします。(実際はドキュメントを読むのに疲れて方法探すのを諦めてしまいました・・・)

最終的に複数のイベントが１つのZabbixエントリに入ることが嫌だったので、[こちらのツール](https://github.com/fideltak/oneview-event-logger)も作りましたので参考にしてください。