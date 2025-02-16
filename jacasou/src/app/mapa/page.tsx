export default function Mapa() {
    return (
      <div className="w-full h-96 md:h-[450px] lg:h-[500px] flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.747332523988!2d-43.27159502393179!3d-22.95953063975956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd66c73de49d5%3A0x58921e8c1f0ee600!2sCasa%20do%20Alto!5e0!3m2!1sen!2sbr!4v1739055406356!5m2!1sen!2sbr"
          className="w-full h-full rounded-lg shadow-lg"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }
  