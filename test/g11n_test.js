var G11N = require('g11n');

var assert = require('chai').assert,
    expect = require('chai').expect,
    should = require('chai').should;

describe('G11N', function () {
    describe('#constructor()', function () {
        var g11n = new G11N();

        it('should have `maps` property', function () {
            expect(g11n).to.have.property('maps');
        });
    });

    describe('#bind()', function () {
        var g11n = new G11N();

        var en = require('json!./mocks/en-us');

        g11n.bind(en);

        it('should bind language data to the maps', function () {
            expect(g11n.maps[g11n.namespace]).to.have.property('hello');
        });

        var namespace = 'en-us';

        g11n.bind(en, namespace);

        it('should bind language data to the maps with namespace', function () {
            expect(g11n.maps[namespace]).to.have.property('hello');
        });
    });

    describe('#t()', function () {
        var g11n = new G11N();

        var en = require('json!./mocks/en-us');

        g11n.bind(en);

        it('should get the corresponding value', function () {
            expect(g11n.t('hello')).to.equal(en.hello);
        });

        var namespace = 'en-us';
        g11n.bind(en, namespace);

        it('should get the corresponding value with namespace', function () {
            expect(g11n.t('hello', namespace)).to.equal(en.hello);
        });

        g11n.bind({
            'test': 'hello :test'
        });

        it('should replace the content of placeholder', function () {
            expect(g11n.t('test', {':test': 'world'})).to.equal('hello world');
        });
    });

    describe('#import', function () {
        var en = require('json!./mocks/en-us');

        it('should get the corresponding value with namespace', function () {
            var g11n = new G11N();
            g11n.imports('/base/test/mocks/en-us');
            expect(g11n.t('hello')).to.equal(en.hello);
        });

        it('should throw an exception if there is no json file', function () {
            var g11n = new G11N(),
                fn = function () {
                    g11n.imports('test/mocks/en-us');
                };
            expect(fn).to.throw(Error);
        });
    });

    describe('#render', function () {
        var g11n = new G11N(),
            en = require('json!./mocks/en-us');

        g11n.bind(en);

        it('should replace the content of placeholder', function () {
            expect(g11n.render('hello: {%hello%}')).to.equal('hello: hello(en-us)');
        });
    });
});