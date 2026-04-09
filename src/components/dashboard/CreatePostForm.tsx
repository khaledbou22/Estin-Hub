import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cities, serviceTypes } from "@/lib/mock-data";
import type { Category } from "@/lib/mock-data";

export function CreatePostForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | "">("");
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = () => {
    const newImage = `https://picsum.photos/seed/${Date.now()}/400/300`;
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="services">Services</SelectItem>
            <SelectItem value="marketplace">Marketplace</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="lost-found">Lost & Found</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Enter a descriptive title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Provide details about your post" rows={4} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" type="tel" placeholder="+213 555 00 00 00" />
      </div>

      <div className="space-y-2">
        <Label>Images (Optional)</Label>
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative h-24 w-24 overflow-hidden rounded-lg border">
              <img src={image} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleImageUpload}
            className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed hover:border-primary hover:text-primary"
          >
            <ImagePlus className="h-6 w-6" />
          </button>
        </div>
      </div>

      {category === "services" && (
        <>
          <div className="space-y-2">
            <Label>Service Type</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select service type" /></SelectTrigger>
              <SelectContent>
                {serviceTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (DZD)</Label>
            <Input id="price" type="number" placeholder="Enter your rate" min={0} />
          </div>
        </>
      )}

      {category === "marketplace" && (
        <>
          <div className="space-y-2">
            <Label>Condition</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (DZD)</Label>
            <Input id="price" type="number" placeholder="Enter price" min={0} required />
          </div>
        </>
      )}

      {category === "transport" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>From</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Departure city" /></SelectTrigger>
                <SelectContent>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Destination city" /></SelectTrigger>
                <SelectContent>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats</Label>
              <Input id="seats" type="number" placeholder="Number of seats" min={1} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price per Seat (DZD)</Label>
            <Input id="price" type="number" placeholder="Enter price per seat" min={0} />
          </div>
        </>
      )}

      {category === "lost-found" && (
        <>
          <div className="space-y-2">
            <Label>Type</Label>
            <RadioGroup defaultValue="lost" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lost" id="lost" />
                <Label htmlFor="lost" className="font-normal">Lost</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="found" id="found" />
                <Label htmlFor="found" className="font-normal">Found</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Where was it lost/found?" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" required />
          </div>
        </>
      )}

      <div className="flex gap-4">
        <Button type="submit" className="flex-1" disabled={!category}>
          Create Post
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
