import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, FileBox, CheckCircle, X } from "lucide-react";
import { submitForm } from "@/lib/submitForm";
import { useToast } from "@/hooks/use-toast";
import quoteIllustration from "@/assets/quote-illustration.png";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  mobile: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid mobile number"),
  message: z.string().trim().max(1000).optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;
type AnimState = "visible" | "closing-trash" | "closing-submit" | "closed";

const SESSION_KEY = "lead_capture_shown";

const LeadCaptureModal = () => {
  const [open, setOpen] = useState(false);
  const [animState, setAnimState] = useState<AnimState>("closed");
  const [showNotification, setShowNotification] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", mobile: "", message: "" },
  });

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      setAnimState("visible");
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    if (animState !== "visible") return;
    setAnimState("closing-trash");
  }, [animState]);

  const onSubmit = useCallback(async (data: LeadFormValues) => {
    const result = await submitForm(
      { name: data.name, email: data.email, phone: data.mobile, message: data.message },
      "lead_capture"
    );
    if (result.success) {
      setAnimState("closing-submit");
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  }, [toast]);

  const handleAnimationComplete = useCallback(() => {
    if (animState === "closing-trash") {
      setOpen(false);
      setAnimState("closed");
      form.reset();
    } else if (animState === "closing-submit") {
      setOpen(false);
      setAnimState("closed");
      form.reset();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3500);
    }
  }, [animState, form]);

  const isClosing = animState === "closing-trash" || animState === "closing-submit";
  const targetIcon = animState === "closing-trash" ? "trash" : "submit";

  const suctionVariants = {
    visible: {
      scale: 1,
      y: 0,
      x: 0,
      opacity: 1,
      borderRadius: "8px",
      rotate: 0,
      skewX: 0,
    },
    closing: {
      scale: 0.02,
      y: 350,
      x: 0,
      opacity: 0,
      borderRadius: "50%",
      rotate: 3,
      skewX: 2,
      transition: {
        duration: 0.65,
        ease: [0.55, 0.05, 0.68, 0.19] as [number, number, number, number],
      },
    },
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          if (!val && animState === "visible") {
            handleClose();
          }
        }}
      >
        <DialogContent
          className="sm:max-w-3xl p-0 overflow-hidden border-border/40 bg-transparent shadow-2xl [&>button]:hidden"
          onPointerDownOutside={(e) => {
            if (isClosing) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (isClosing) e.preventDefault();
            else handleClose();
          }}
        >
          <motion.div
            variants={suctionVariants}
            initial="visible"
            animate={isClosing ? "closing" : "visible"}
            onAnimationComplete={() => {
              if (isClosing) handleAnimationComplete();
            }}
            className="origin-bottom"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left gradient panel */}
              <div className="relative bg-gradient-to-br from-[hsl(170,80%,35%)] to-[hsl(210,80%,45%)] p-8 md:p-10 flex flex-col justify-center items-center text-white overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                {/* Decorative shapes */}
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-white/10 blur-sm" />
                <div className="absolute bottom-10 right-8 w-24 h-24 rounded-full bg-white/5 blur-md" />
                <div className="absolute top-1/2 left-4 w-8 h-8 rounded-full bg-white/15" />
                <div className="absolute bottom-6 left-1/3 w-3 h-3 rounded-full bg-white/30" />
                <div className="absolute top-8 right-12 w-5 h-5 rounded-full bg-white/20" />

                <div className="relative z-10 text-center space-y-4">
                  <img
                    src={quoteIllustration}
                    alt="Get a free quote"
                    className="w-40 h-40 mx-auto object-contain mb-4"
                  />
                  <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight">
                    Get A Free<br />Quote Now
                  </h2>
                  <p className="text-white/80 text-sm md:text-base max-w-[240px] mx-auto leading-relaxed">
                    Please complete this form to be connected by one of our experts.
                  </p>
                </div>
              </div>

              {/* Right form panel */}
              <div className="bg-background/95 backdrop-blur-xl p-8 md:p-10 rounded-b-lg md:rounded-r-lg md:rounded-bl-none relative">
                {/* Custom close button */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Name"
                              className="h-11 rounded-lg border-border/60 bg-muted/30 placeholder:text-muted-foreground/60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter Email Id"
                              className="h-11 rounded-lg border-border/60 bg-muted/30 placeholder:text-muted-foreground/60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter Phone Number"
                              className="h-11 rounded-lg border-border/60 bg-muted/30 placeholder:text-muted-foreground/60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Message"
                              className="min-h-[90px] rounded-lg border-border/60 bg-muted/30 placeholder:text-muted-foreground/60 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-[hsl(170,80%,35%)] to-[hsl(210,80%,45%)] hover:opacity-90 border-0 text-white rounded-full px-8"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Dock icons that appear during suction animation */}
      <AnimatePresence>
        {isClosing && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-14 h-14 rounded-2xl bg-background/90 backdrop-blur-xl border border-border/50 shadow-xl flex items-center justify-center"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                delay: 0.45,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {targetIcon === "trash" ? (
                <Trash2 className="w-7 h-7 text-muted-foreground" />
              ) : (
                <FileBox className="w-7 h-7 text-primary" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* macOS-style success notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[70] w-[360px] max-w-[90vw]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-background/80 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(170,80%,35%)] to-[hsl(210,80%,45%)] flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Message Delivered</p>
                <p className="text-xs text-muted-foreground">Our team will reach out shortly.</p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-muted-foreground/60 hover:text-foreground transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeadCaptureModal;
