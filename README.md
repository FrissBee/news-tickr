# News TickR

With the _News TickR_ you can display a news ticker.

There is a horizontal and a vertical news ticker.

Both can be customized via attributes.

The repo contains various examples. See the file `index.html`.

## Preview

[You can view the demo here](https://news-tickr.frissbee.de/).

## Description

Implement the _News TickR_ in your project:

**1. Step - download and add**

Download or clone the repo and add the file `news-tickr_1.0.0.js` into your project.

**2. Step - implementation**

Include the `news-tickr_1.0.0.js` file in the corresponding HTML or PHP file with `<script src="./path-to-the-file/news-tickr_1.0.0.js" defer></script>` in the `<head>`-Tag

**3. Step - insert one of the two news-tickr HTML tags**

Insert the `<news-tickr-h></news-tickr-h>` or the `<news-tickr-v></news-tickr-v>` tag in the desired HTML or PHP file at the desired position.

`<news-tickr-h></news-tickr-h>` is for a horizontal, `<news-tickr-v></news-tickr-v>` for a vertical News Ticker.

Add a `div` element within the tag for each individual text. Inside this `div` element can be plain text or HTML.

Example:

```html
<!-- horizontal: -->
<news-tickr-h>
  <div>1. Item</div>
  <div><span style="color: rgb(30, 102, 161)">3. Item</span></div>
  <!-- and so on... -->
</news-tickr-h>

<!-- vertical: -->
<news-tickr-v>
  <div>1. Item</div>
  <div><span style="color: rgb(30, 102, 161)">3. Item</span></div>
  <!-- and so on... -->
</news-tickr-v>
```

**4. Step - customize**

Use the attributes (see below) to customize the _News TickR_.

## Quick view

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Typing Text</title>

    <!-- 1. Insert the "news-tickr_1.0.0.js" file -->
    <script src="./path-to-the-file/news-tickr_1.0.0.js" defer></script>
  </head>
  <body>
    <main>
      <!--2.  Insert the "news-tickr" tag -->
      <!-- horizontal: -->
      <news-tickr-h>
        <div>1. Item</div>
        <div><span style="color: rgb(30, 102, 161)">3. Item</span></div>
        <!-- and so on... -->
      </news-tickr-h>
    </main>
  </body>
</html>
```

## All attributes

#### For horizontal

- `animation-time`

  Time in seconds of the sequence.

  Example: `animation-time="30"`.

- `bg-color`

  Background color of the container.

  Example: `bg-color="#f2f2f2"`.

- `is-top`

  This attribute is used to specify the distance the _News TickR_ should have from the top. Is set if the ticker should not be inside the page. The unit must also be specified.

  Example: `is-top="0px"`;

- `is-bottom`

  This attribute is used to specify the distance of the _News TickR_ from the bottom edge. Is set if the ticker should not be inside the page. The unit must also be specified.

  Example: `is-bottom="0px"`;

- `is-fixed`

  If this attribute is specified, the news ticker remains at this position. This is primarily intended in conjunction with the `is-top` and `is-bottom` attributes.

  A value does not have to be specified.

- `border-color`

  Border color of the container. The specified value is like `border-color` from CSS.

  Example: `border-color="2px solid #808080"`.

- `border-radius`

  Border radius of the container. The specified value is like `border-radius` from CSS.

  Example: `border-radius="8px"`.

- `item-padding`

  Spacing of the text line. The specified value is like `padding` from CSS.

  Example: `item-padding="10px 120px"`.

#### For vertical

- `animation-time`

  Time in seconds of the sequence.

  Example: `animation-time="30"`.

- `bg-color`

  Background color of the container.

  Example: `bg-color="#f2f2f2"`.

- `ticker-height`

  Height of the container. The unit must also be specified.

  Example: `ticker-height="120px"`.

- `item-padding`

  Spacing of the text line. The specified value is like `padding` from CSS.

  Example: `item-padding="14px 20px"`.

- `is-top`

  This attribute is used to specify the distance the _News TickR_ should have from the top. Is set if the ticker should not be inside the page. The unit must also be specified.

  Example: `is-top="0px"`.

- `is-bottom`

  This attribute is used to specify the distance of the _News TickR_ from the bottom edge. Is set if the ticker should not be inside the page. The unit must also be specified. Example: `is-bottom="0px""`;

- `is-fixed`

  If this attribute is specified, the news ticker remains at this position. This is primarily intended in conjunction with the `is-top` and `is-bottom` attributes.

  A value does not have to be specified.

- `border-color`

  Border color of the container. The specified value is like `border-color` from CSS.

  Example: `border-color="2px solid #808080"`.

- `border-radius`

  Border radius of the container. The specified value is like `border-radius` from CSS.

  Example: `border-radius="8px"`.

- `text-position`

  This attribute is used to specify the position at which the text lines are specified.

  There are: `center` (default), `left` and `right`.
