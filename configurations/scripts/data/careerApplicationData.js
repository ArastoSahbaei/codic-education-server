import CareerModel from "../../../src/models/Career.model.js"

export const careerApplicationData =
	[
		{
			title: 'Utbildare inom .NET',
			description: 'Sprid dina kunskaper till framtidens programmerare!',
			location: 'Gothenburg',
			jobType: 'Utbildare',
			lastDate: '01-12-2021'
		},
		{
			title: 'Utbildare med passion för Java ',
			description: 'Pedagogisk? Driven? Har goda kunskaper inom Java? Då var med också hjälp oss med att utbilda framtidens programmerare!',
			location: 'Malmö',
			jobType: 'Utbildare',
			lastDate: '2022-01-04'
		},
		{
			title: 'DevOps specialist',
			description: 'Sprid dina kunskaper till framtidens programmerare!',
			location: 'Malmö',
			jobType: 'Utbildare',
			lastDate: '2021-11-01'
		},
		{
			title: 'Scrum master',
			description: 'Sprid dina kunskaper till framtidens programmerare!',
			location: 'Gothenburg',
			jobType: 'Utbildare',
			lastDate: '2021-10-29'
		},
		{
			title: 'Frontend Utvecklare ',
			description: 'Pedagogisk? Driven? Har goda kunskaper inom C#? Då var med också hjälp oss med att utbilda framtidens programmerare!',
			location: 'Gothenburg',
			jobType: 'Utbildare',
			lastDate: '2021-09-30'
		},
		{
			title: 'Python Utvecklare',
			description: 'Pedagogisk? Driven? Har goda kunskaper inom Python? Då var med också hjälp oss med att utbilda framtidens programmerare!',
			location: 'Utbildare',
			jobType: 'Stockholm',
			lastDate: '2021-09-30'
		},
		{
			title: 'Backend Utvecklare',
			description: 'Sprid dina kunskaper till framtidens programmerare!',
			location: 'Stockholm',
			jobType: 'Utbildare',
			lastDate: '2022-01-22'
		},

	]

export const populateCareerApplications = () => {
	careerApplicationData.forEach(career => {
		try {
			CareerModel.insertMany(career)
		} catch (error) {
			console.log('Error occurred when seeding data to the database')
		}
	})
}