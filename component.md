# View Component

A component gets initialized with props provided by
calling context (e.g. parent component), which is
referred to as a caller.

Caller provides among props:
 - hosting HTML Element/Node
 - data for initial state

A component may have child components that are
created and initialized by the component or
supplied to the component by a caller (e.g. router
may supply layout component with a component
layout should embed as main content, while other
components like menu, login/logout UI may be created
and managed by the layout component itself).

## Component initialization

On creation component
 - determines its own initial state from props
 - gets target DOM host to render view to from props
 - initializes child elements if any supplying those
   with props (including data for initial state and
   rendering target host)

## Component state update

When component state gets updated the component
re-renders itself into the host.

If the component has child components those also
may be inquired to render their view by
means of their state updates.

## Workflow
