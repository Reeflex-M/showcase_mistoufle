function ContactMap() {
  return (
    <div className="md:w-1/2">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre localisation</h2>
        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=48°34'21.72%22N+3°51'28.66%22W&zoom=16"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactMap;
