import { Cards, Card } from 'react-swipe-card'



const Wrapper = () => {

  const data = ['Alexandre', 'Thomas', 'Lucien']



  return (

        {data.map(item =>
          <Card
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}

  )
}

export default Wrapper
