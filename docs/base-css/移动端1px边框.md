### 移动端 1px 边框

#### 1. 使用 transform: scaleY(0.5) 缩放
```css
.border-1px {
  position: relative;
}
.border-1px::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background: #000;
  transform: scaleY(0.5);
}
```
#### 2. 使用 box-shadow 模拟边框
```css
.border-1px {
  position: relative;
}
.border-1px::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #000;
  transform: scale(0.5);
  transform-origin: 0 0;
}
```
#### 3. 使用 border-image 模拟边框
```css
.border-1px {
  border: 1px solid transparent;
  border-image: url('border.png') 2 repeat;
}
```
#### 4. 使用 viewport 单位
```css
.border-1px {
  height: 1vw;
}
```