function ContactMap() {
  return (
    <div className="md:w-1/2">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre localisation</h2>
        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.939748790136!2d-3.86055702366791!3d48.57270277129487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48116765b7e4199f%3A0x7d397cc2cebd6e67!2sRefuge%20Les%20Mistoufles!5e0!3m2!1sfr!2sfr!4v1733410042899!5m2!1sfr!2sfr"
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
