import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormLabel,
  Radio,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { Building, Mail, Phone, Globe, Sparkles, Check, ArrowRight } from 'lucide-react';

interface FormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  adTier: 'listing' | 'pin' | 'hero';
  targetAudience: string;
  notes: string;
}

const initialFormState: FormState = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  website: '',
  adTier: 'listing',
  targetAudience: 'Any',
  notes: ''
};

/**
 * UNDERSTANDSPACE LEAD GENERATION INTEGRATION ARCHITECTURE NOTE:
 * =========================================================================
 * This satellite form collects high-intent regional merchant leads for the 
 * "Understand Houston" FIFA 2026 World Cup directory. 
 * 
 * Production Bridge Architecture:
 * 1. Payload Protocol: Form state is formatted into a standardized REST JSON outline.
 * 2. Gateway Endpoint: Sent via POST requests to the central Understandspace headless 
 *    WordPress REST API (`/wp-json/understandspace/v1/lead-ingestion`) or a secure
 *    Express backend route (`/api/leads`).
 * 3. Authentication: Uses a secure HMAC signature key (stored in server-side .env and 
 *    mapped via Astro endpoints) in the Bearer token header to block cross-site forgery.
 * 4. Synchronization: Synced into the centralized WordPress core DB (under custom post types
 *    or CRM plugins) to schedule automated invoice drafting and partner onboarding pipelines.
 * =========================================================================
 */
export default function PartnerForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    
    if (formData.phone && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error inline
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const selectTier = (tier: 'listing' | 'pin' | 'hero') => {
    setFormData((prev) => ({
      ...prev,
      adTier: tier
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowErrorToast(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to the Understandspace Wordpress REST / Astro API routes
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Sending structured payload to Understandspace backend:', {
        meta: {
          satellite: 'Understand Houston Node',
          campaign: 'World Cup 2026 Merchant Acquisition',
          timestamp: new Date().toISOString()
        },
        payload: formData
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error('Lead pipeline ingestion failed:', err);
      setShowErrorToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ background: '#FFFFFF', border: '1px solid #F0EAE1', borderRadius: '12px', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: '#8B5C1A', color: '#FFFFFF', p: { xs: 3, md: 4 } }}>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Sparkles size={14} className="animate-pulse" />
          Understandspace Intelligence Node
        </Typography>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 800, mb: 1 }}>
          Secure Your Enterprise Ad Space
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '550px', lineHeight: 1.6 }}>
          Ingest your company profiles directly into the 2026 World Cup local directory. Verified leads sync directly with the central Understandspace business portal.
        </Typography>
      </Box>

      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <AnimatePresence mode="wait">
          {!submitSuccess ? (
            <motion.form
              key="partnership-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleFormSubmit}
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Col 1 */}
                <div className="col-span-1">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    <Building size={20} className="text-[#8B5C1A] mb-2.5" />
                    <TextField
                      required
                      fullWidth
                      id="businessName"
                      label="Business name"
                      name="businessName"
                      variant="standard"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      error={!!errors.businessName}
                      helperText={errors.businessName}
                    />
                  </Box>
                </div>

                {/* Col 2 */}
                <div className="col-span-1">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    <Sparkles size={18} className="text-[#8B5C1A] mb-2.5" />
                    <TextField
                      required
                      fullWidth
                      id="contactName"
                      label="Contact person"
                      name="contactName"
                      variant="standard"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      error={!!errors.contactName}
                      helperText={errors.contactName}
                    />
                  </Box>
                </div>

                {/* Col 3 */}
                <div className="col-span-1">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    <Mail size={18} className="text-[#8B5C1A] mb-2.5" />
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email address"
                      name="email"
                      type="email"
                      variant="standard"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Box>
                </div>

                {/* Col 4 */}
                <div className="col-span-1">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    <Phone size={18} className="text-[#8B5C1A] mb-2.5" />
                    <TextField
                      fullWidth
                      id="phone"
                      label="Phone number (optional)"
                      name="phone"
                      variant="standard"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Box>
                </div>

                {/* Web Field */}
                <div className="col-span-1 md:col-span-2">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    <Globe size={18} className="text-[#8B5C1A] mb-2.5" />
                    <TextField
                      fullWidth
                      id="website"
                      label="Website URL"
                      name="website"
                      variant="standard"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </Box>
                </div>

                {/* Premium Tier Picker */}
                <div className="col-span-1 md:col-span-2 mt-4">
                  <FormLabel component="legend" sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', tracking: '0.05em', mb: 2 }}>
                    Premium Campaign Package
                  </FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Option 1 */}
                    <div className="col-span-1">
                      <Box
                        onClick={() => selectTier('listing')}
                        sx={{
                          p: 2.5,
                          borderRadius: '12px',
                          border: `2px solid ${formData.adTier === 'listing' ? '#8B5C1A' : '#F0EAE1'}`,
                          cursor: 'pointer',
                          bgcolor: formData.adTier === 'listing' ? '#FAF8F5' : 'transparent',
                          transition: 'all 0.2s',
                          '&:hover': { borderColor: '#A6804E' }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Standard ad</Typography>
                          <Radio checked={formData.adTier === 'listing'} size="small" color="primary" value="listing" name="adTier" />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#8B5C1A', fontWeight: 800, mb: 1 }}>$499 / Tier 1</Typography>
                        <Typography variant="body2" sx={{ color: '#555', fontSize: '0.75rem', lineHeight: 1.4 }}>
                          Includes basic placement in the Houston 2026 directory with map coordinates and business info.
                        </Typography>
                      </Box>
                    </div>

                    {/* Option 2 */}
                    <div className="col-span-1">
                      <Box
                        onClick={() => selectTier('pin')}
                        sx={{
                          p: 2.5,
                          borderRadius: '12px',
                          border: `2px solid ${formData.adTier === 'pin' ? '#8B5C1A' : '#F0EAE1'}`,
                          cursor: 'pointer',
                          bgcolor: formData.adTier === 'pin' ? '#FAF8F5' : 'transparent',
                          transition: 'all 0.2s',
                          '&:hover': { borderColor: '#A6804E' }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Featured hub pin</Typography>
                          <Radio checked={formData.adTier === 'pin'} size="small" color="primary" value="pin" name="adTier" />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#8B5C1A', fontWeight: 800, mb: 1 }}>$899 / Tier 2</Typography>
                        <Typography variant="body2" sx={{ color: '#555', fontSize: '0.75rem', lineHeight: 1.4 }}>
                          Generates a glowing gold pin on the high-fidelity interactive explorer, priority listing status.
                        </Typography>
                      </Box>
                    </div>

                    {/* Option 3 */}
                    <div className="col-span-1">
                      <Box
                        onClick={() => selectTier('hero')}
                        sx={{
                          p: 2.5,
                          borderRadius: '12px',
                          border: `2px solid ${formData.adTier === 'hero' ? '#8B5C1A' : '#F0EAE1'}`,
                          cursor: 'pointer',
                          bgcolor: formData.adTier === 'hero' ? '#FAF8F5' : 'transparent',
                          transition: 'all 0.2s',
                          '&:hover': { borderColor: '#A6804E' }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Enterprise hero</Typography>
                          <Radio checked={formData.adTier === 'hero'} size="small" color="primary" value="hero" name="adTier" />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#8B5C1A', fontWeight: 800, mb: 1 }}>$1,999 / Tier 3</Typography>
                        <Typography variant="body2" sx={{ color: '#555', fontSize: '0.75rem', lineHeight: 1.4 }}>
                          Hero banner integrations, interactive promotions, and direct API lead synchronization to your CRM.
                        </Typography>
                      </Box>
                    </div>
                  </div>
                </div>

                {/* Audience Field */}
                <div className="col-span-1 md:col-span-2">
                  <TextField
                    select
                    fullWidth
                    label="Primary Target Audience"
                    name="targetAudience"
                    variant="outlined"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Any">All World Cup Visitors (Global Audience)</MenuItem>
                    <MenuItem value="Tourists">International Travelers & Football Fans</MenuItem>
                    <MenuItem value="Enterprise">Corporate Outings & Sports Executives</MenuItem>
                    <MenuItem value="Foodies">Culinary Lovers & Fine Dining Enthusiasts</MenuItem>
                  </TextField>
                </div>

                {/* Notes Field */}
                <div className="col-span-1 md:col-span-2">
                  <TextField
                    fullWidth
                    id="notes"
                    label="Ad specs or regional campaign notes"
                    name="notes"
                    multiline
                    rows={3}
                    placeholder="E.g., Require special translation into Spanish/French, or visual graphic specifications..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="col-span-1 md:col-span-2 mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                      fontWeight: 700,
                      py: 1.8,
                      fontSize: '1rem',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={20} color="inherit" />
                        <span>Synchronizing Node with Understandspace...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Campaign Proposal</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="submission-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="flex flex-col items-center text-center py-8 px-4"
            >
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center border-2 border-amber-800 text-amber-800 mb-6">
                <Check size={28} strokeWidth={3} />
              </div>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1A1A', mb: 2 }}>
                Lead Synchronized Successfully
              </Typography>
              <Typography variant="body1" sx={{ color: '#555', mb: 4, maxWidth: '450px' }}>
                Your advertisement campaign lead has been successfully validated and is securely integrated into the <strong>Understandspace Intelligence Network</strong>. An Enterprise Account Executive will contact you within 2 business hours.
              </Typography>
              
              <Box sx={{ px: 3, py: 2, bgcolor: '#FAF8F5', borderRadius: '8px', border: '1px solid #F0EAE1', mb: 4, width: '100%', textAlign: 'left' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#8B5C1A', textTransform: 'uppercase', display: 'block', mb: 1, letterSpacing: '0.05em' }}>
                  Ingested Metadata Reference
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#333' }}>
                  • Lead Reference: USH-{Math.floor(100000 + Math.random() * 900000)}<br />
                  • Node ID: understand-houston-satellite<br />
                  • Package Tier: {formData.adTier.toUpperCase()}<br />
                  • Queue Status: ACTIVE DIRECTORY ONBOARDING
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFormData(initialFormState);
                  setSubmitSuccess(false);
                }}
                sx={{ borderRadius: '12px', border: '1px solid #A6804E', color: '#A6804E' }}
              >
                Submit another request
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Snackbar
          open={showErrorToast}
          autoHideDuration={4000}
          onClose={() => setShowErrorToast(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowErrorToast(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
            Please correct the validation errors in the form.
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
