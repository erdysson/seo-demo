## User centric performance metrics

We all know that performance matters. When we talk about `performance` and making a website `fast`, what do we actually mean? 

> Performance is relative!

- A site might be fast for one user but slow for another user
- Two sites may finish loading exact same amount of time, yet one may `seem` to load faster (if loads content progressively, rather than waiting until the end to display anything) 
- A site might `appear` to load quickly, but then respond slowly (or not at all) to user interaction

> it's important to be precise and refer to performance in terms of objective criteria (called **metrics**) that can be quantitatively measured 

> Web performance used to be measured with the `load` event. However, even though `load` is a well-defined moment in a page's lifecycle, that moment doesn't necessarily correspond with anything the user cares about.

For example, a server could respond with a minimal page that "loads" immediately but then defers fetching content and displaying anything on the page until several seconds after the load event fires.
While such a page might technically have a fast load time, that time would not correspond to how a user actually experiences the page loading. 

> To help ensure the metrics are relevant to users, we frame them around a few key questions:

- **Is it happening**? Did navigation start successfully? Has the server responded?
- **Is it useful**? Has enough content rendered that users can engage with?
- **Is it usable**? Can user interact with the page, or is it busy?
- **Is it delightful**? Are the interactions smooth and natural, free of lag and jank?

## Types of metrics

Given all the above types of performance metrics, it's hopefully clear that no single metric is sufficient to capture all the performance characteristics of a page.

## Important metrics to measure

- **TTFB** (Time to first byte): Measures the time it takes for the network to respond to a user request with the first byte of a resource
- **FCP** (First contentful paint): Measures the time from when the page starts loading to when any part of the page's content is rendered on the screen
- **LCP** (Largest contentful paint): Measures the time from when the page starts loading to when the largest text block or image element is rendered on the screen.
- **FID** (First input delay): Measures the time from when a user first interacts with your site (when they click a link, tap a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to respond to that interaction
- **INP** (Interaction to next paint) : Measures the latency of every tap, click, or keyboard interaction made with the page, and—based on the number of interactions—selects the worst interaction latency of the page (or close to the highest) as a single, representative value to describe a page's overall responsiveness
- **TTI** (Time to interactive) : Measures the time from when the page starts loading to when it's visually rendered, its initial scripts (if any) have loaded, and it's capable of reliably responding to user input quickly
- **TBT** (Total blocking time) : Measures the total amount of time between `FCP` and `TTI` where the main thread was blocked for long enough to prevent input responsiveness
- **CLS** (Cumulative layout shift) : Measures the cumulative score of all unexpected layout shifts that occur between when the page starts loading and when its lifecycle state changes to hidden

While this list includes metrics measuring many of the various aspects of performance relevant to users, it does not include everything. For example, runtime responsiveness and smoothness are not currently covered.

The performance metrics listed above are good for getting a general understanding of the performance characteristics of most sites on the web. They're also good for having a common set of metrics for sites to compare their performance against their competitors.
However, there may be times when a specific site is unique in some way that requires additional metrics to capture the full performance picture.
For example, the LCP metric is intended to measure when a page's main content has finished loading, but there could be cases where the largest element is not part of the page's main content and thus LCP may not be relevant.

The web performance working group has also standardized lower level APIs that can be useful for implementing your own custom metrics:

- [User Timing API](https://w3c.github.io/user-timing/)
- [Long Task API](https://w3c.github.io/longtasks/)
- [Element Timing API](https://wicg.github.io/element-timing/)
- [Navigation Timing API](https://w3c.github.io/navigation-timing/)
- [Resource Timing API](https://w3c.github.io/resource-timing/)
- [Server Timing](https://w3c.github.io/server-timing/)

## Core web vitals metrics and thresholds

Core web vitals consists of 3 metrics;
- `LCP` for perceived load speed
- `FID` for responsiveness and user interaction
- `CLS` for visual stability and the amount of unexpected layout shift of visible content

> Each of those has associated thresholds, which categorize performance as either good, needs improvement, or poor

| Metric | Good      | Poor      | Percentile | 
|--------|-----------|-----------|------------|
| LCP    | <= 2500ms | \> 4000ms | 75         |
| FIP    | <= 100ms  | /> 300ms  | 75         |
| CLS    | <= 0.1    | /> >0,25  | 75         |

- if at least 75 percent of page views to a site meet the "good" threshold, the site is classified as having "good" performance for that metric.
- Conversely, if at least 25 percent of page views meet the "poor" threshold, the site is classified as having "poor" performance.

So, for example, a 75th percentile LCP of 2 seconds is classified as **good**, while a 75th percentile LCP of 5 seconds is classified as **poor**.

More detailed reading can be found [here](https://web.dev/defining-core-web-vitals-thresholds/)

--------

### LCP (Largest contentful paint)

Measures the time from when the page starts loading to when the largest text block or image element is rendered on the screen.

| Metric | Good      | Poor      | Percentile       |
|--------|-----------|-----------|------------------|
| LCP    | <= 2500ms | \> 4000ms | 75th percentile  |

#### What elements are considered ?
  - `<img>` elements
  - `<img>` elements inside an `svg` element
  - `<video>` elements (the poster image is used)
  - An element with a background image loaded via the `url()` function
  - block-level elements containing text nodes or other inline-level text elements children

> Images that occupy the entire viewport are not considered LCP candidates

> Restricting element to this limited set is intentional to keep things simple.

> Additional elements like `svg` or `video` may be added in the future.

> How is the element's size determined?
>  - The visible size to the user within viewport. if the element extends outside of the viewport, or clipped or has non-visible overflow, those portions do not count for the size.
>  - For image elements that is resized from their `intrinsic size`, the smaller of intrinsic size or visible size is used.
>  - For text elements, only the size of their text nodes is considered. (the smallest rectangle that contain all text nodes)
>  - For all elements, any margin, padding, or border applied via CSS is not considered.


>
> - An element can only be considered the largest contentful element once it has rendered and is visible to the user. Images that have not been loaded yet are not considered "rendered", neither text nodes using web fonts during the "font block period".
> - If an element that is currently largest contentful element is removed from the viewport or DOM, it will remain the largest contentful element unless a larger element is rendered. 
> - Prior to Chrome 88, removed elements were not considered as largest contentful element :)
> - Browser will stop reporting new entries as soon as the user interacts with the page.

[<img src="https://web-dev.imgix.net/image/admin/uJAGswhXK3bE6Vs4I5bP.png?auto=format&w=845">](https://web-dev.imgix.net/image/admin/uJAGswhXK3bE6Vs4I5bP.png?auto=format&w=845)

[<img src="https://web-dev.imgix.net/image/admin/e0O2woQjZJ92aYlPOJzT.png?auto=format&w=845">](https://web-dev.imgix.net/image/admin/e0O2woQjZJ92aYlPOJzT.png?auto=format&w=845)

#### How to improve LCP

- Apply instant loading with `PRPL` (**preload** important resources, **render** initial route ASAP, **pre-cache** remaining assets, **lazy load** other routes and non-critical assets) pattern
- Optimize critical rendering path
- Optimize CSS
- Optimize images
- Optimize web fonts
- Optimize JS (CSR sites)

--------

### FID (First input delay)

FID measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing the event handlers in response to that interaction.

| Metric | Good     | Poor     | Percentile       |
|--------|----------|----------|------------------|
| FID    | <= 100ms | \> 300ms | 75th percentile  |

> In general, input delay (latency) happens because the browser's main thread is busy doing sth else, so can't respond to the user.
One of the reasons browser is busy parsing and executing a large JS file loaded by your app, and can't run any event listeners because the JS loading might tell it to do sth else.

> FID only measures the delay, not the event processing time itself

> FID measures the delta between when an input event is received and when the main thread is next idle. So, FID is measured even without event listener registration.

- Following HTML elements need to wait for in-progress tasks on the main thread to complete prior to responding to user interaction:
  - `<input>`
  - `<textarea>`
  - `<select>`
  - `<a>`

### How to improve FID

- Reduce impact of 3rd party code
- Reduce JS execution time
- Minimize main thread work
- Keep request counts low and transfer sizes small

--------

### CLS (Cumulative layout shift)

Unexpected movement of page content usually happens due to async content or DOM elements are created dynamically above the existing content

Culprit might be
- an image or video with unknown dimensions,
- a font that renders larger or smaller than its fallback
- or a 3rd party content dynamically resizes itself

| Metric | Good   | Poor    | Percentile       |
|--------|--------|---------|------------------|
| CLS    | <= 0.1 | \> 0.25 | 75th percentile  |


What makes this issue even more problematic is that how a site functions in development is often quite different from how users experience it

Personalized or 3rd party content often behaves differently, for example test images are already in developer's browser cache, and API calls locally run way faster than production, so the delay isn't noticeable.

> CLS metric helps to address this problem by measuring how often it's occurring for users

> CLS is a measure of the largest burst of _layout shift_ scores for every unexpected layout shift that occurs during the lifespan of a page 

> A layout shift occurs any time a visible element changes its position from one rendered frame to the next

> A bust of layout shifts, known as a session window, is when one or more individual layout shifts occur in rapid succession with less than 1-second in between each shift and a maximum of 5 seconds for the total window duration


#### Layout shifts in detail

- Any time an element that is visible in the viewport changes its start position (top & left position) between two frames. Such elements are considered unstable elements.
- Occurs  only when an existing elements change their start position. New elements do not count as layout shift -- as long as the change does not cause other visible elements to change their start position.

To calculate the **layout shift score**, the browser looks at the viewport size and the movement of unstable elements in the viewport between two rendered frames.

> layout shift score = impact fraction * distance fraction

- **impact fraction** measures how unstable elements impact the viewport area between two frames.
- the union of the visible areas of all unstable elements for the prev & current frame -- as a fraction of the total area of the viewport -- is the impact fraction for the current frame

- **distance fraction** is the greatest distance any unstable element has moved in the frame, divided by the viewport's largest dimension (width or height, whichever is greater)

[<img src="https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/BbpE9rFQbF8aU6iXN1U6.png?auto=format&w=845">](https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/BbpE9rFQbF8aU6iXN1U6.png?auto=format&w=845)

[<img src="https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/xhN81DazXCs8ZawoCj0T.png?auto=format">](https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/xhN81DazXCs8ZawoCj0T.png?auto=format)


So, in the example; impact fraction is 0.75, and the distance fraction is 0.25, so the layout shift score is 0.1875.

#### Expected vs unexpected layout shifts

- A layout shift is only bad if the user isn't expecting it. For example, Layout shifts after user interaction are fine

Layout shifts that occur within 500 ms of user input will have the `hadRecentInput` flag set, so they can be excluded from calculations.

> the flag will be set to true only for discrete input events like tap, click or keypress.
> Continuous interactions such as scrolls, drags, or pinch and zoom gestures are not considered "recent input".

#### Animations and transitions

- CSS `transform` property allows animate without triggering layout shifts.

> instead of changing height and width properties, use `transform: scale()`
> to move elements around, avoid changing `top`, `right`, `bottom`, or `left` properties and use `transform: translate()`.

### How to improve CLS

You can avoid unexpected layout shifts by sticking to a few guiding principles:

- always include size attributes on images and video elements, or reserve the required space with something like CSS aspect ratio boxes.
- never insert content above existing content, except in response to a user interaction. Ensures that layout shifts are expected.
- Prefer transform animations to animations of properties that trigger layout changes

--------

## Metrics that has impact on web vitals scores

### TTFB (Time to first byte)

| Metric | Good     | Poor      | 
|--------|----------|-----------|
| TTFB   | <= 800ms | \> 1800ms |

> TTFB is not a core web vitals metrics, so it's not absolutely necessary to meet the "good" TTFB threshold.
> TTFB thresholds are a "rough guide", and will matter how your sites delivers its core content, such as SSR or sole SPA.

#### Checklist to improve TTFB

- **Hosting** that can handle traffic properly,
- Using **CDN**,
- **Avoiding multiple page redirects**. Another important source of redirect time can come from **HTTP-to-HTTPS redirects**. One way you can get around this is to use the Strict-Transport-Security header (HSTS), which will enforce HTTPS on the first visit to an origin, and then will tell the browser to immediately access the origin through the HTTPS scheme on future visits.
- Using service worker, **stale-while-revalidate** strategy for assets, **streaming service worker architecture** if possible, **the app shell model** for CSR applications.

### FCP (First contentful paint)

| Metric | Good      | Poor      | Percentile       |
|--------|-----------|-----------|------------------|
| FCP    | <= 1800ms | \> 3000ms | 75th percentile  |


#### Checklist to improve FCP
- Eliminate **render-blocking resources**
- **Minify** resources
- Remove unused **CSS** and **JS** (browser coverage tab is really helpful)
- **Pre-connect** to required origins
- Reduce **TTFB**
- **Preload** key requests
- Avoid **large network payloads**
- Serve static assets with an **efficient cache policy**
- Avoid **excessive DOM size**
- Minimize **critical request depth**
- Ensure **text remains visible during webfont load**
- Keep **request counts low** and **transfer sizes small**

### Last words

- In our company and product, we know that we are not running for SEO. However, a pleasant application performance is valuable.

- Why? Having a new customer, is 10x more expensive than keeping an existing customer, and to make sure that we keep our existing customers, we need to provide them a pleasant application performance.

For more details, information and articles, refer to [web.dev](https://web.dev)
