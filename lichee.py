# -*- coding: utf-8 -*-
import urllib2
from flask import Flask, jsonify

fund_config = {
    'ali': {
        '519679': dict(principal=5000, shares=1954.29),
        '270021': dict(principal=3000, shares=1698.12),
        '163412': dict(principal=2000, shares=1020.57),
    },
    'jd': {
        '110029': dict(principal=5000, shares=3757.60),
        '530003': dict(principal=1500, shares=1049.19),
        '070027': dict(principal=200, shares=104.65)
    }
}

app = Flask(__name__)
app.debug = True


def fund_codes(funds):
    return ','.join(map(lambda x: 'f_' + x, funds.keys()))


def get_funds(which):
    _funds = fund_config[which] if which in fund_config.keys() else reduce(lambda x, y: dict(x, **y), fund_config.values())
    funds = []
    request = urllib2.Request('http://hq.sinajs.cn/?_=139369130310/&list=%s' % fund_codes(_funds))
    response = urllib2.urlopen(request)
    for line in response:
        lineinfo = line.decode('gbk').encode('utf-8')[13:-3].split('="')
        _list = lineinfo[1].split(',')
        _list[0] = _list[0].decode('utf-8')
        _list[1] = float(_list[1])
        _list[3] = float(_list[3])

        code = lineinfo[0][-6:]
        fund_info = dict()
        fund_info['code'] = code
        fund_info['name'] = _list[0]
        fund_info['today_value'] = _list[1]
        fund_info['preday_value'] = _list[3]
        fund_info['value_date'] = _list[4]
        fund_info['amount'] = float('%0.2f' % (_list[1] * _funds[code]['shares']))
        fund_info.update(_funds[code])
        funds.append(fund_info)
    return funds


@app.route('/funds')
@app.route('/funds/<which>')
def list_funds(which=None):
    return jsonify(funds=get_funds(which))

if __name__ == '__main__':
    app.run(host='0.0.0.0')
