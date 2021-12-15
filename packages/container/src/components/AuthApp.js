import { mount } from 'auth/AuthApp'
import React, { useRef, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

export default ({onSignIn}) => {
	const ref = useRef(null)
	const history = useHistory()

	useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
			onNavigate: ({ pathname: nextPathname }) => {
				// adding the check if we want to change the path
				const { pathname } = history.location
				// then we want to navigate to this new path
				if (pathname !== nextPathname) {
					history.push(nextPathname)
				}
			},
			onSignIn,
		})

		history.listen(onParentNavigate)

		// only try to run this function when our makerting app is on the screen
	}, [])

	return <div ref={ref} />
}
