import classes from './Notification.module.css'

const Notification = props => {
	let specialClasses = ''

	console.log(props.status)
	console.log(specialClasses)

	if (props.status === 'pending') {
		specialClasses = classes.pending
	}

	if (props.status === 'error') {
		specialClasses = classes.error
	}

	if (props.status === 'success') {
		specialClasses = classes.success
	}

	const cssClasses = `${classes.notification} ${specialClasses}`
	console.log(cssClasses)
	return (
		<section className={cssClasses}>
			<h2>{props.title}</h2>
			<p>{props.message}</p>
		</section>
	)
}

export default Notification
