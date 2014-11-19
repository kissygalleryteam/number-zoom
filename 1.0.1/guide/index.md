## 综述

NumberZoom数字放大器，同时会显示中文单位。

## 初始化组件

html：

    <input type="text" class="J_NumberZoom" value="2342342342" maxlength="11"/>

javascript:
        
    S.use('kg/number-zoom/1.0.1/index,kg/number-zoom/1.0.01index.css', function (S, NumberZoom) {
        var numberZoom = new NumberZoom({$target:'.J_NumberZoom'});
    })

## API说明

### show()

显示放大器
