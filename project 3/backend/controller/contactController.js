const Contact = require('../models/Contact');

const handleContactFormSubmission = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('Contact form submission saved:', { name, email, message });
    res.status(200).send('Message received and stored');
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    res.status(500).send('Server error');
  }
};

module.exports = handleContactFormSubmission;
