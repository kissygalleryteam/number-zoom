KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('number-zoom', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/number-zoom/1.1.2/']});