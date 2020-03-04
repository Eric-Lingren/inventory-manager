/**
 *  ErrorBoundary.js is a HOC that works site wide.  When the user wants to access a component, it checks to see if there are any javascript errors.  If so,   it will catch that error and notify without breaking the entire app. 
 *  @props - Coming in from whatever component is passed to it.
 *  THIS COMPONEST LIVES IN: ProtectedRoute.js
 *  THIS COMPONENT IS DEPENDENT ON:  None 
 *  OTHER COMPONENTS RELIANT ON THIS COMPONENT: All components via the ProtectRoute.js and consequentely via Route in App.js
 */

import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, info) {
        this.setState({ error: error, errorInfo: info });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="error-boundary">
                    <summary>Something went wrong</summary>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error && this.state.error.toString()}
                        {this.state.errorInfo.componentStack}
                    </details>
                    </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;