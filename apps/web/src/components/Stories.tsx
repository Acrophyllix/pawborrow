const POSTS = [
  {
    date: '24 May, 2024',
    title: 'First-Time Borrower? Here\u2019s What to Expect',
    tone: 'coral',
  },
  {
    date: '24 May, 2024',
    title: 'How We Screen Every Companion Before Borrowing',
    tone: 'peach',
  },
  {
    date: '24 May, 2024',
    title: 'Weekend With a Dog: A QC Student\u2019s Story',
    tone: 'sand',
  },
];

export default function Stories() {
  return (
    <section className="section stories">
      <h2>Stories & Tips</h2>

      <div className="stories__grid">
        {POSTS.map((post) => (
          <a href="#" className="story-card" key={post.title}>
            <div className={`story-card__cover story-card__cover--${post.tone}`}>
              <span className="story-card__badge">News</span>
            </div>
            <p className="story-card__date">{post.date}</p>
            <h3>{post.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
