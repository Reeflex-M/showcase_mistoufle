function ContactMap() {
  return (
    <div className="md:w-1/2">
      <div className="h-full rounded-xl overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.939748790136!2d-3.86055702366791!3d48.57270277129487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48116765b7e4199f%3A0x7d397cc2cebd6e67!2sRefuge%20Les%20Mistoufles!5e0!3m2!1sfr!2sfr!4v1733410042899!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "400px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactMap;
