# Native js template

## Pug
Основной файл страницы, куда импортятся все секции
````
/src/index.page
````
Head файл, необходим для подключения зависимостей
````
/src/head.pug
````
Для указания классов используется pug_bem
````
pug .__element -> html <div class="parent__element"></div>
pug .__element.-modificator -> html <div class="parent__element parent__element--modificator"></div>
pug p.__text -> html <p class="parent__text"><p>
````

## Scss
Файл критических стилей ``/src/assets/scss/style.critical.scss`` <br/>
Файл main стилей ``/src/assets/scss/style.main.scss`` <br/>

## JavaScript
В проекте используются модульный js, все имторты должны сойтись в файле `src/assets/js/index.js` <br/>
Все js-модуль компонентов должны сойтись в файле `src/components/components.js`

## Images
Во время сборки или во время npm-команды `image` все картинки из директории `/src/assets/images` сжимаются, обрезаются и оптимизируется

### PNG/JPG
есть 3 вариант указания размера изображени: <br/>
Первый: <br/>
````
Входное имя файла - image.[png | jpg]
Выходные файлы: image.[png | jpg], image.webp
````
Второй: <br/>
````
Входное имя файла - image[width].[png | jpg]
Выходные файлы с шириной width: image.[png | jpg], image.webp
````
Третий: <br/>
````
Входное имя файла - image[d_width|t_width|m_widht].[png | jpg], 
где d_width ширина для десктоп, 
    t_width ширина для таблетки,
    m_width ширина для телефона
Выходные файлы с шириной width: 
    image-mobile.[png | jpg], 
    image-tablet.[png | jpg], 
    image-desktop.[png | jpg], 
    image-mobile.webp, 
    image-tablet.webp, 
    image-desktop.webp
````

#### Компонент png/jpg изображения
```
/src/components/Image
```
Этот комопнент стоит использовать для отображения изображений в формате png/jpg

### SVG
Для использования svg изображения, нужно занести картинку в src/assets/images

## Favicon
Для подключения favicon нужно занести favicon.png изображение в public/ и использовать <br/>
``npm run image`` или ``npm run prod`` <br/>
После этого в dist/public/favicon/ появятся favicon`и для всех форматов и подключатся в dist/index.html


## Npm commands
``npm run image`` - оптимизируется и сожмет все изорбажения <br/>
``npm run favicon`` - создаст набор favicon и подставит его все импорты в index.html <br/>
``npm run dev`` - запусть дев-сервер <br/>
``npm run prod`` - соберет сборку под продакшн <br/>
``npm run start`` - запустит dist на сервере <br/>