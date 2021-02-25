Local repository for Etch-A-Sketch exercise from The Odin Project.

Will update with learned lessons about JS and DOM manipulation, as well as any tidbits of HTML and CSS found along the way.

1. Avoided overlapping borders between CSS grid squares by setting the container's LEFT and BOTTOM borders separately. Then each square's TOP and RIGHT border.

2. • Grid: Added a reset function which now takes the user's input as row/column parameter
   • Colors: Previously tried to change hover colors by using offset and client coordinates as RGB values, not ideal. Afterwards, used Math.random rounded with Math.floor and multiplied by 255
   • Stylings: Removed flex display from body so that the interface wouldn't shrink when the window was resized (better for troubleshooting with developer tools). Changed container template for the default 8x8 grid. Removed container and individual square stylings, the latter being left only with border property.