import 'primer-buttons/build/build.css'
import './index.css'

export class Filters extends React.Component {
	render() {
		const {filters, onSelect, selected} = this.props
		return (
			<div className="filters">
				<div className="btn-group">
					{filters.map((id) =>
						<button className={`btn btn-sm ${selected === id && 'selected'}`}
							onClick={() => onSelect(id)}
							key={id}>{i18n.t(`filters.${id}`)}</button>
					)}
				</div>
			</div>
		)
	}
}
