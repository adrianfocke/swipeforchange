import Link from 'next/link'

const Faq = () => {
  return (
    <div className="card margin-bottom-double" id="info">
      <div className="cardContent dropdown-toggle">
        <div className="cardContentHeadline">
          <h1>How-To Guide</h1>
          <h4 className="padding-top">So verwendest du das NGO-Matching richtig.</h4>
        </div>
        <p className="paragraph padding-bottom">Du willst aktiv werden, aber weißt nicht so genau wie du Kontakte knüpfen kannst? Oder welche Tätigkeit dir Spaß macht? Dann ist unsere Homepage genau das Richtige für dich!</p>
        <p className="paragraph padding-bottom">Hier findest du Informationen und Kontaktdaten zu verschiedenen Non-Profit-Organisationen in Wien mit denen du dich vernetzen kannst. Du kannst dich durchklicken, die Organisation finden die gut zu dir passt und hast dann auch Kontaktdaten von Vertreter*innen um dich zu connecten! ;)</p>
        <Link href="/"><button title="Navigate to home" className="toggle pill margin-left margin-bottom">Verstanden! ✓</button></Link>
    </div>
    </div>
  )
}
export default Faq;
