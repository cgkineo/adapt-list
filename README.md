# adapt-list

**List** is a *presentation component* which displays text in a list. The list items can be displayed with or without an image. If no image is defined then either a plain bullet (unordered) or numerical bullet that counts upwards per item (ordered) will display.

## Support layouts

Layout | Image | Layout | Image
--- | --- | --- | ---
Images (maximum width of 64px) | <img width="450" alt="Screenshot 2022-12-02 at 11 59 53" src="https://user-images.githubusercontent.com/11569678/205288598-55092153-fcbf-40ec-9801-e81d0bb055fe.png"> | Unordered and ordered lists | <img width="450" alt="Screenshot 2022-12-02 at 12 00 27" src="https://user-images.githubusercontent.com/11569678/205288646-0d5050ce-6bd1-4ab3-9779-f0d15620e92c.png">
Columns with images | <img width="450" alt="Screenshot 2022-12-02 at 12 01 08" src="https://user-images.githubusercontent.com/11569678/205288664-c060d166-e155-44fd-9630-0888f70a1431.png"> | Columns with unordered and ordered lists | <img width="450" alt="Screenshot 2022-12-02 at 12 01 41" src="https://user-images.githubusercontent.com/11569678/205288683-fd1faf84-0266-4db0-a681-9016e0f0c049.png">

## Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

### \_component (string):
This must be set to: `"list"`.

### \_classes (string):
CSS class name(s) to be applied to this component's containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

### \_layout (string):
This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.

### \_columns (number):
Defines the number of columns wide the **\_items** are displayed in. If the value of **\_numberOfColumns** is `2`, each **\_items** will be 50% wide. Similarly, if the value of **\_numberOfColumns** is `3`, each **\_items** will be 33.3% wide. In mobile view, the width of each **\_items** is 100%.

### \_orderedList (boolean):
If set to `true`, each item in the list will be numbered. This setting will only take affect if there are no list item images defined. The default value is `false`.

### \_animateList (boolean):
If set to `true`, the list of items will animate when scrolled into view. The default value is `false`.

### \_percentInviewVertical (number):
Controls what percentage of the list items height needs to be in the viewport in order for the items to animate. Default value is to animate when 70% 'in view'. You only need to set this property if you want to override the default value.

### \_itemHorizontalAlignment (string):
Controls the horizontal alignment of the list items. This setting will only take affect if the `_columns` property has a value above `0`. Values available utilise the CSS property [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content). The default value is `start`. It contains the following settings:
* `start`: Aligns the list item with the natural page direction. In a left-to-right course this is left by default.
* `center`: Aligns the list item to the center of the container.
* `end`: Aligns the list item to the opposite side of the natural page direction. In a left-to-right course this is right by default.

### \_bulletAlignment (string):
Controls the vertical alignment of the list item image or bullet alongside the text content. If the `_columns` property has a value above `0` then the alignment switches from vertical to horizontal. Values available utilise the CSS property [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items). The default value is `start`. It contains the following settings:
* `start`: Aligns the list item image or bullet to the top of the container. If `_columns` is used then this setting aligns the list item image or bullet with the natural page direction. In a left-to-right course this is left by default.
* `center`: Aligns the list item image or bullet to the center of the container vertically. If `_columns` is used then this setting aligns the list item image or bullet horizontally.
* `end`: Aligns the list item image or bullet to the bottom of the container. If `_columns` is used then this setting aligns the list item image or bullet to the opposite side of the natural page direction. In a left-to-right course this is right by default.

### \_items (object):
Multiple items may be created. Each item represents one list item for this component. It contains the following settings:

#### title (string):
This is the title text for the list item.

#### body (string):
This is the main body text for the list item.

#### \_graphic (object):
The graphic object that defines the image which is rendered alongside the body text. It contains the following settings:

##### src (string):
File name (including path) of the image. Path should be relative to the `src` folder (e.g. `"course/en/images/origami-menu-two.jpg"`). Only supported when **\_orderedList** is set to `false`.

##### alt (string):
The alternative text for this image. Assign [alt text](https://github.com/adaptlearning/adapt_framework/wiki/Providing-good-alt-text) to images that convey course content only.

##### attribution (string):
Optional text to be displayed as an [attribution](https://wiki.creativecommons.org/Best_practices_for_attribution). By default it is displayed below the image. Adjust positioning by modifying CSS. Text can contain HTML tags, e.g., `Copyright © 2015 by <b>Lukasz 'Severiaan' Grela</b>`

## Limitations

No known limitations.

----------------------------
**Version number:**  6.0.0 <br>
**Framework versions:** 5.14+ <br>
**Author / maintainer:** Kineo <br>
**Accessibility support:** WAI AA <br>
**RTL support:** Yes <br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 14 for macOS/iOS/iPadOS, Opera <br>
