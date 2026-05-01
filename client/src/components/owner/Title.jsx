import React from 'react'

const Title = ({ title, subtitle }) => {
	return (
		<div className="owner-title-animate">
			<h1 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">{title}</h1>
			{subtitle ? (
				<p className="mt-2 text-sm text-[var(--color-muted)] sm:text-base">{subtitle}</p>
			) : null}
		</div>
	)
}

export default Title
