Local repository for Etch-A-Sketch exercise from The Odin Project.

Will update with learned lessons about JS and DOM manipulation, as well as any tidbits of HTML and CSS found along the way.

1. Avoided overlapping borders between CSS grid squares by setting the container's LEFT and BOTTOM borders separately. Then each square's TOP and RIGHT border.

2. • Grid: Added a reset function which now takes the user's input as row/column parameter
   • Colors: Previously tried to change hover colors by using offset and client coordinates as RGB values, not ideal. Afterwards, used Math.random rounded with Math.floor and multiplied by 255
   • Stylings: Removed flex display from body so that the interface wouldn't shrink when the window was resized (better for troubleshooting with developer tools). Changed container template for the default 8x8 grid. Removed container and individual square stylings, the latter being left only with border property.

3. It turns out that if you change a CSS Rule dynamically by accessing it through its index in the CSSOM, you should NOT add new rules above it in the stylesheet. And if you do, change the index in JavaScript!

4. Tried to turn the Monochrome button into a "color" type input on click so that one wouldn't have to click on the button first and THEN on the color mixer to get a new value.

 Wasn't able to find a way to do so — created a separate "color" type input and placed it over the Monochrome button. Set its opacity to 0 so that it would still be clickable, but only the Monochrome "fake button" would be visible.

A sharp eye will see that clicking on it doesn't generate the "pressed button" effect.

5. Tried to come up with a 'click and hold' function for the drag coloring mode, but ended up going for two event listeners (thanks to bscottnz on GitHub for the inspiration!), one after the other:
   • First, a 'click' event that calls colorByHovering only on the clicked square, then a 'mouseenter' that calls colorByDragging whenever the cursor goes into any other square and the mouse button is held down.