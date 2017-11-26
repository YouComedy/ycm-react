export class Title extends React.Component {
	componentDidMount() {
		this.updateTitle(this.props.children)
	}

	componentDidUpdate() {
		this.updateTitle(this.props.children)
	}

	updateTitle = (title) => {
		const ycm = i18n.t('app.title')
		document.title = title && title !== ycm
			? `${ycm}: ${title}`
			: ycm
	}

	render() {
		return null
	}
}
