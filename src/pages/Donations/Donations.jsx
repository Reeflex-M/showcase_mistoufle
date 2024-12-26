import { motion } from "framer-motion";
import { Paper, Typography, Box, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaHandHoldingHeart, FaEnvelope, FaEuroSign } from 'react-icons/fa';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const DonationIcon = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const PageHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12 pt-24"
  >
    <h1 className="text-5xl font-bold text-gray-800 mb-4">
      Faire un <span className="text-primary-dark">don</span>
    </h1>
    <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
  </motion.div>
);

function Donations() {
  const donationMethods = [
    {
      title: "HelloAsso",
      description: "Faites un don en ligne sécurisé via HelloAsso. Votre contribution aide directement nos actions de protection animale.",
      link: "https://www.helloasso.com/associations/les-mistoufles/formulaires/1",
      icon: <FaHandHoldingHeart />,
      buttonText: "Faire un don"
    },
    {
      title: "Chèque",
      description: "Envoyez votre don par chèque à l'ordre de 'Les Mistoufles'. Adresse : Rue du Grand Launay, 29600 Saint-Martin-des-Champs.",
      icon: <FaEnvelope />
    },
    {
      title: "Virement",
      description: "Effectuez un virement bancaire pour soutenir notre cause. Contactez nous pour obtenir les coordonnées bancaires.",
      icon: <FaEuroSign />,
      link: "/contact",
      buttonText: "Nous contacter"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pb: 12 }}>
      <PageHeader />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}
        >
          Votre générosité nous aide à continuer notre mission de protection et de soin des animaux.
          Chaque don compte et contribue directement au bien-être de nos protégés.
        </Typography>

        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          {donationMethods.map((method, index) => (
            <motion.div
              key={method.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StyledPaper elevation={3}>
                <DonationIcon>{method.icon}</DonationIcon>
                <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
                  {method.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  align="center" 
                  sx={{ mb: 3, flexGrow: 1 }}
                >
                  {method.description}
                </Typography>
                {(method.link && method.buttonText) ? (
                  <Button
                    variant="contained"
                    href={method.link}
                    target={method.link.startsWith('http') ? "_blank" : "_self"}
                    rel={method.link.startsWith('http') ? "noopener noreferrer" : ""}
                    sx={{
                      borderRadius: '28px',
                      textTransform: 'none',
                      px: 4,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                      }
                    }}
                  >
                    {method.buttonText || "Faire un don"}
                  </Button>
                ) : null}
              </StyledPaper>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
}

export default Donations;
